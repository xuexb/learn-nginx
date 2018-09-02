# Node.js 反向代理

服务端如果使用`nodejs`运行服务，由于端口不能同时多个服务占用，而服务器中可能又是多个网站，那么可以使用 Nginx 做反向代理，比如有这些网站域名和端口：

域名 | 端口
--- | ---
www.xxoo.com | 8001
www.xo.com | 8002
www.xo.cn | 8003

当然一个服务器上的网站可能还有更多，可以通过配置 Nginx 转发来代理这些端口分发，如：

```conf
server {
    server_name www.xxoo.com;
    listen 80;

    # 设置这个网站的根目录
    root /wwwroot/www.xxoo.com/;

    # 由于下面配置了文件不存在则代码到 Node.js 中，那么直接访问目录（不带默认主页）的话会有问题，这里做下判断
    # 如果访问目录下有 index.html 文件，则直接重写到该文件
    # break 表示重写且停止，但 url 不变，而 permanent 表示301重定向，url 会更新
    if ( -f $request_filename/index.html ){
        rewrite (.*) $1/index.html break;
    }

    # 如果请求的文件不存在，则代理到 Node.js
    if ( !-f $request_filename ){
        rewrite (.*) /index.js;
    }

    # 代理node服务 8001
    location = /index.js {
        # 设置一些代理的header信息，这些信息将被透传到 Node.js 服务的header信息里
        proxy_set_header Connection "";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;

        # 代理服务
        proxy_pass http://127.0.0.1:8001$request_uri;

        # 忽略其他重写
        proxy_redirect off;
    }
}
```

配置之后，比如你网站根目录里有 `index.html` 文件，访问 `url` 如：

访问链接 | 解析过程 | 备注
--- | --- | ---
www.xxoo.com/index.html | Nginx | 由于文件存在，直接使用 Nginx 输出
www.xxoo.com | Nginx | 由于判断该目录下有 `index.html` 文件，则自动重写到该文件，但 `url` 不变
www.xxoo.com/xx.html | Nginx -> Node.js:8001 | 由于文件不存在，使用 Nginx 代理到 Node.js 的 8001 端口
www.xxoo.com/xxoo/ | Nginx -> Node.js:8001 | 首先判断该目录是否存在<br>如果存在再判断是否有 `index.html` 文件<br>一旦不成立，直接代理到 Node.js
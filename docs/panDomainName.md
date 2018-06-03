# 配置泛域名转发

有的时候，我们需要配置一些自定义的子域名，如：

- `xuexb.user.demo.com`
- `a01.user.demo.com`

这时候就需要域名的 DNS 解析一个泛域名 `*.user.demo.com` 到服务器，Nginx 可以配置如下：

## 子域名转发到子目录

```nginx
server {
    listen       80;
    server_name ~^([\w-]+)\.user\.demo\.com$;

    location / {
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header        Host $http_host;
        proxy_set_header        X-NginX-Proxy true;
        proxy_pass              http://127.0.0.1:8080/$1$request_uri;
    }
}
```

以上配置表示：

- `xuexb.user.demo.com/path?a=1` -> `127.0.0.1:8080/xuexb/path?a=1`
- `a01.user.demo.com/path?a=1` -> `127.0.0.1:8080/a01/path?a=1`

这样后端就可以根据子目录解析不同的规则，甚至 Nginx 可以再进行链接重写。

## 子域名配置不同的目录

```nginx
server {
    listen       80;
    server_name ~^([\w-]+)\.user\.demo\.com$;

    root /home/user/wwwroot/user/$1;
}
```

以上配置可以把不同的子域名分发到不同的目录中，做到路径分离的功能，如：

- `xuexb.user.demo.com` -> `/home/user/wwwroot/user/xuexb`;
- `a01.user.demo.com` -> `/home/user/wwwroot/user/a01`;
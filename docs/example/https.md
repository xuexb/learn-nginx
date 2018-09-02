# 配置 HTTPS

首先配置支持 HTTPS 必须让 Nginx 开启 `http_ssl_module` 模块，[点击查看nginx编译安装参数](/guide/nginx-configure-descriptions.html) ，可以使用`nginx -V`查看是否开启`TLS SNI support enabled`。

购买/生成 SSL 证书，可以使用免费的证书，比如：[Let's Encrypt，免费好用的 HTTPS 证书](https://imququ.com/post/letsencrypt-certificate.html) 。

```conf
# 配置 HTTPS

# 配置个http的站点，用来做重定向，当然如果你不需要把 HTTP->HTTPS 可以把这个配置删了
server {
    listen       80;

    # 配置域名
    server_name www.xxoo.com xxoo.com;

    # 添加 STS, 并让所有子域支持, 开启需慎重
    add_header strict-transport-security 'max-age=31536000; includeSubDomains; preload';

    # 配置让这些 HTTP 的访问全部 301 重定向到 HTTPS 的
    rewrite ^(.*) https://www.xxoo.com$1 permanent;
}

# 配置 HTTPS
server {
    # 配置域名
    server_name www.xxoo.com xxoo.com;

    # https默认端口
    listen 443;

    # 添加STS, 并让所有子域支持, 开启需慎重
    add_header strict-transport-security 'max-age=31536000; includeSubDomains; preload';

    # https配置
    ssl on;
    ssl_certificate /xxoo/www.xxoo.com.crt;
    ssl_certificate_key /xxoo/www.xxoo.com.key;

    # 其他按正常配置处理即可...
}
```

> 注意，这里证书的格式是 `.crt` 的。

### 配置后的访问规则

输入链接 | 最终访问链接
--- | ---
http://www.xxoo.com | https://www.xxoo.com
http://www.xxoo.com/404/500 | https://www.xxoo.com/404/500
http://xxoo.com | https://www.xxoo.com
https://www.xxoo.com | -（原链接不变）
https://xxoo.com/500 | https://www.xxoo.com/500

### 强烈推荐

使用 <https://github.com/Neilpang/acme.sh> 支持泛域名证书申请了，好赞。
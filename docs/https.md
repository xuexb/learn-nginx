# 配置https

首先配置支持`https`必须让`nginx`开启`http_ssl_module`模块，[点击查看nginx编译安装参数](https://xuexb.com/html/linuxzhong-bian-yi-an-zhuang-he-pei-zhi-nginx.html#h3-3) ，可以使用`nginx -V`查看是否开启`TLS SNI support enabled`。

购买/生成`ssl`证书，可以使用免费的证书，比如：[Let's Encrypt，免费好用的 HTTPS 证书](https://imququ.com/post/letsencrypt-certificate.html), [签发免费 SSL 泛域名证书](https://yjk.im/any-ssl/)

```conf
# 配置https

# 配置个http的站点，用来做重定向，当然如果你不需要把http->https可以把这个配置删了
server {
    listen       80;
    # 配置域名
    server_name www.xxoo.com xxoo.com;

    # 配置让这些http的访问全部301重定向到https的
    rewrite ^(.*) https://www.xxoo.com$1 permanent;
}

# 配置https
server {
    # 配置域名
    server_name www.xxoo.com xxoo.com;

    # https默认端口
    listen 443;

    # https配置
    ssl on;
    ssl_certificate /xxoo/www.xxoo.com.crt;
    ssl_certificate_key /xxoo/www.xxoo.com.key;

    # 其他按正常配置处理即可...
}
```

> 注意，这里证书的格式是`.crt`的

### 配置后的访问规则

输入链接 | 最终访问链接
--- | ---
http://www.xxoo.com | https://www.xxoo.com
http://www.xxoo.com/404/500 | https://www.xxoo.com/404/500
http://xxoo.com | https://www.xxoo.com
https://www.xxoo.com | -（原链接不变）
https://xxoo.com/500 | https://www.xxoo.com/500

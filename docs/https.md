# 配置https

首先配置支持`https`必须让`nginx`开启`http_ssl_module`模块，[点击查看nginx编译安装参数](https://xuexb.com/html/linuxzhong-bian-yi-an-zhuang-he-pei-zhi-nginx.html#h3-3) ，可以使用`nginx -V`查看是否开启`TLS SNI support enabled`。

购买/生成`ssl`证书，可以使用免费的证书，比如：[Let's Encrypt，免费好用的 HTTPS 证书](https://imququ.com/post/letsencrypt-certificate.html)

[点击查看nginx配置](../conf/https.conf)

> 注意，这里证书的格式是`.crt`的

### 配置后的访问规则

输入链接 | 最终访问链接
--- | ---
http://www.xxoo.com | https://www.xxoo.com
http://www.xxoo.com/404/500 | https://www.xxoo.com/404/500
http://xxoo.com | https://www.xxoo.com
https://www.xxoo.com | -（原链接不变）
https://xxoo.com/500 | https://www.xxoo.com/500

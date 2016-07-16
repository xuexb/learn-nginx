# learn-nginx

> 学习安装、配置`nginx`

## 目录结构

```
# 站点、例子配置目录
./conf/

# nginx配置主入口 - 默认自带
./nginx.conf

# nginx默认自带其他文件
./fastcgi_params, fastcgi.conf mime.types, win-utf, scgi_params, uwsgi_params, koi-utf, koi-win
```

## list

* [linux中编译安装和配置nginx](https://xuexb.com/html/linuxzhong-bian-yi-an-zhuang-he-pei-zhi-nginx.html)
* [设置主域301重定向](docs/domain.md)
* [配置nodejs反向代理](docs/nodejs-proxy.md)
* [配置https](docs/https.md)
* [nginx配置url重写](docs/url.md)
    * [rewrite](docs/url.md#rewrite)
    * [if判断](docs/url.md#if判断)
    * [location](docs/url.md#location)
* 配置nginx前置缓存
* 配置https资源代理
* nginx日志切割
* nginx负载均衡
* 配置图片防盗链
* windows中安装nginx

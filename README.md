# learn-nginx

> 学习安装、配置`nginx`

## 在学习之前你可能需要掌握的

* linux服务器和一些常用的操作命令
* 域名，当然如果是本地玩玩也可以是`Hosts`
* 基本的正则表达式

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

* [nginx配置文件说明](docs/conf.md)
* [linux中编译安装和配置nginx](https://xuexb.com/html/linuxzhong-bian-yi-an-zhuang-he-pei-zhi-nginx.html)
* [设置主域301重定向](docs/domain.md)
* [配置nodejs反向代理](docs/nodejs-proxy.md)
* [配置https](docs/https.md)
* [nginx配置url重写](docs/url.md)
    * [rewrite](docs/url.md#rewrite)
    * [if判断](docs/url.md#if判断)
    * [location](docs/url.md#location)
* [配置图片防盗链](docs/invalid_referer.md)
* [配置https资源代理](docs/proxy.md)
* [配置nginx前置缓存](docs/cache.md)
* [nginx负载均衡](docs/upstream.md)
* nginx日志切割
* windows中安装nginx

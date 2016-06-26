# learn-nginx

> 学习安装、配置`nginx`

## 目录结构

```
# 站点配置目录，存放以域名为文件名的配置文件
./conf/

# fastcgi配置 - nginx默认自带
./fastcgi.conf
./fastcgi_params

# mime配置 - nginx默认自带
./mime.types

# nginx默认自带
./win-utf, scgi_params, uwsgi_params, koi-utf, koi-win
```

## list

* [linux中编译安装和配置nginx](https://xuexb.com/html/linuxzhong-bian-yi-an-zhuang-he-pei-zhi-nginx.html)
* [设置主域301重定向](docs/domain.md)
* [配置nodejs反向代理](docs/nodejs-proxy.md)
* 配置https
* 配置nginx前置缓存
* 配置https资源代理
* nginx日志切割
* nginx负载均衡
* nginx配置url重写
* windows中安装nginx

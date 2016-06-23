# linux-nginx

> 学习`linux`上安装、配置`nginx`

### 目录结构

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

### 学习编译安装nginx

[linux中编译安装和配置nginx](https://xuexb.com/html/linuxzhong-bian-yi-an-zhuang-he-pei-zhi-nginx.html)

### 主域重定向

以`xuexb.com`为主域，访问`www.xuexb.com`时自动301重定向到`xuexb.com`

[点击查看配置](conf/www.xuexb.com.conf)

### 配置node反向代理

### 配置https

### 配置nginx前置缓存

### 配置https资源代理

### nginx日志切割

### nginx负载均衡

### nginx配置url重写
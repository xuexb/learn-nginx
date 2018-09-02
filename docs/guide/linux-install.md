# Linux 中编译安装和配置 Nginx

> 注意：本示例在 Centos 6.5 、Centos 7.3 中运行。

## 下载安装包并解压

```bash
# 进入约定的安装包目录
cd /约定目录/src/

# 下载nginx安装文件，这里以 nginx-1.11.1 为例，其他的nginx包可以去官网查找
wget http://nginx.org/download/nginx-1.11.1.tar.gz

# 把安装包解压，会自动解压到 /约定目/src/nginx-1.11.1/ 文件夹里
tar xzf nginx-1.11.1.tar.gz
```

## nginx的配置文件

其实完全可以使用 Nginx 的默认配置文件，默认配置文件编译后的地址在 `程序目录/conf/nginx.conf` ，但如果你会频繁的更新 Nginx 版本的话配置文件最后"分离"，类似前后端分离一样，这样可以少"吵架"(解耦合)，我们单独的把 Nginx 的所有配置，包括所有站点的配置、SSL 证书都放在 `/约定目录/nginx-conf/` 目录里，如：

```
/约定目录/nginx-conf/

    # nginx配置文件
    ./nginx.conf

    # nginx的其他配置
    ./mime.types

    # 站点配置
    ./conf/
        # 各个子站点目录
        ./www.xxoo.com.conf
        ./www.a.com.conf
        ...
```

`/约定目录/nginx-conf/conf/` 目录里存放以网站为单位的配置文件，文件名以网站域名命名，这样可以配置分离，互不影响，而且好定位问题。

## 配置nginx安装参数

```shell
# 创建对应版本的程序目录，这个目录用来存放编译后的文件
mkdir -p /约定目录/local/nginx-1.11.1/

# 进入安装包解压后的目录
cd /约定目录/src/nginx-1.11.1/

# 开始配置
./configure --prefix=/home/local/nginx-1.11.1 --conf-path=/home/local/nginx-conf/vhost/nginx.conf --with-http_ssl_module --with-http_realip_module --with-http_dav_module --with-http_gzip_static_module --with-http_v2_module
```

其他的安装编译配置可点击：[Nginx 编译参数](http://www.ttlsa.com/nginx/nginx-configure-descriptions/) 

### 编译nginx

```
# 开始编译并安装，可能需要sudo权限
make
[sudo] make install
```

## 验证是否安装成功

```
# 进入nginx执行目录
cd /约定目录/local/nginx-1.11.1/sbin/
```

运行 `./nginx -v` 查看版本，结果如：

```
nginx version: nginx/1.11.1
```

如果你有开启 `http_ssl_module` ，可运行：`./nginx  -V` 查看是否支持，结果如：

```
nginx version: nginx/1.11.1
built by gcc 4.4.7 20120313 (Red Hat 4.4.7-16) (GCC)
built with OpenSSL 1.0.1e-fips 11 Feb 2013
TLS SNI support enabled
...
```

## 重新编译安装

是指已经安装成功, 但想对 Nginx 添加个模块或者修改配置时需要重新编译。

### 1. 下载对应版本 (如果不想更新版本可以忽略)

可以使用 `nginx -V` 查看当前程序的编译参数

```bash
# 下载

wget http://nginx.org/download/nginx-1.11.13.tar.gz

# 解压
tar xzf nginx-1.11.13.tar.gz
```

### 2. 重新编译

```bash
# 配置
./configure --prefix=xxx 你的新参数

# 编译
[sudo] make
这时侯切记不要make install, 因为make install就会把文件复制到安装目录
```

### 3. 复制程序

```bash
# 新复制老版本, 以防出错
cp /path/nginx /path/nginx.back

# 停止服务
/path/nginx -s stop

# 复制新版本到安装目录
cp objs/nginx /path/nginx

# 查看新版本
/path/nginx -t

# 启动新版本
/path/nginx
```

注意：如果在运行中直接覆盖 Nginx 会报： `cp: 无法创建普通文件"nginx": 文本文件忙` 。
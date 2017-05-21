# linux中编译安装和配置nginx

## 目录约定

首先约定下一些常用的目录，如：

```
# 根目录挂载
/约定目录/

    # 安装包目录，存放一些常用的安装包
    ./src/
        ./nginx-1.11.1.tar
        ./node-6.2.2.tar
        ./zlib-1.2.8.tar.gz
        ...

    # 程序目录，存放一些编译后（运行中）的程序，以版本区分
    ./local/
        ./nginx-1.11.1/
        ./nginx-1.0.0/
        ./node-6.2.2/
        ...

    # nginx的配置，先有这个目录，具体作用下面说
    ./nginx-conf/

    # 网站总目录，网站是以域名为文件名存放在该目录下
    ./wwwroot/
        ./www.xuexb.com/
        ./www.a.com/
        ...
```

## 编译安装nginx

### 下载安装包并解压

```shell
# 进入约定的安装包目录
cd /约定目录/src/

# 下载nginx安装文件，这里以 nginx-1.11.1 为例，其他的nginx包可以去官网查找
wget http://nginx.org/download/nginx-1.11.1.tar.gz

# 把安装包解压，会自动解压到 /home/src/nginx-1.11.1/ 文件夹里
tar xzf nginx-1.11.1.tar.gz
```

### nginx的配置文件

其实完全可以使用`nginx`的默认配置文件，默认配置文件编译后的地址在`程序目录/conf/nginx.conf`，但如果你会频繁的更新`nginx`版本的话配置文件最后"分离"，类似前后端分离一样，这样可以少"吵架"(解耦合)，我们单独的把`nginx`的所有配置，包括所有站点的配置、`ssl`证书都放在`/home/nginx-conf/`目录里，如：

```
/约定目录/local/nginx-conf/

    # nginx配置文件
    ./nginx.conf

    # nginx的其他配置
    ./mime.types

    # 站点配置
    ./conf/
        # www.xxoo.com网站的配置文件
        ./www.xxoo.com.conf
        ./www.a.com.conf
        ...
```

`/约定目录/local/nginx-conf/conf/`目录里存放以网站为单位的配置文件，文件名以网站域名命名，这样可以配置分离，互不影响，而且好定位问题。

### 配置nginx安装参数

```shell
# 创建对应版本的程序目录，这个目录用来存放编译后的文件
mkdir -p /约定目录/local/nginx-1.11.1/

# 进入安装包解压后的目录
cd /约定目录/src/nginx-1.11.1/

# 开始配置
./configure --prefix=/home/local/nginx-1.11.1 --conf-path=/home/local/nginx-conf/vhost/nginx.conf --user=nginx --group=nginx --with-http_ssl_module --with-http_realip_module --with-http_dav_module --with-http_gzip_static_module --with-http_v2_module
```

配置里的一些详情介绍：

```
--prefix 指向安装目录
--conf-path 指向配置文件（nginx.conf），我们不管后续如何升级nginx，配置文件永远用那一个，这样就分离了
--user= 指定程序运行时的非特权用户
--group= 指定程序运行时的非特权用户组
--with-http_realip_module 启用ngx_http_realip_module支持（这个模块允许从请求标头更改客户端的IP地址值，默认为关）
--with-http_dav_module 启用ngx_http_dav_module支持（增加PUT,DELETE,MKCOL：创建集合,COPY和MOVE方法）默认情况下为关闭，需编译开启
--with-http_gzip_static_module 启用gzip功能

以下是2个可选的，可以删了
--with-http_v2_module 开始http2功能，nginx 1.9.5之后支持该功能，之前叫http_spdy_module
--with-http_ssl_module 开启ssl功能，也就是https，当然你可以删除该参数，开启她需要openssl的依赖，openssl你先看下本机有没有装，没有就下个，百度一堆方法
```

其他的安装编译配置可点击：[nginx编译参数](http://www.ttlsa.com/nginx/nginx-configure-descriptions/) 

#### 编译nginx

```
# 开始编译并安装，可能需要sudo权限
[sudo] make
[sudo] make install
```

### 验证是否安装成功

```
# 进入nginx执行目录
cd /约定目录/local/nginx-1.11.1/sbin/
```

运行`./nginx -v`查看版本，结果如：

```
nginx version: nginx/1.11.1
```

如果你有开启`http_ssl_module`，可运行：`./nginx  -V`查看是否支持，结果如：

```
nginx version: nginx/1.11.1
built by gcc 4.4.7 20120313 (Red Hat 4.4.7-16) (GCC)
built with OpenSSL 1.0.1e-fips 11 Feb 2013
TLS SNI support enabled
...
```

## 更新版本

当你想升级`nginx`版本时，可下载、配置、编译安装即可，配置全用`/约定目录/local/nginx-conf`的，这样对网站的配置无影响，非常方便~

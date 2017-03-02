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

# 说明文档
./docs/
```

## list

* [nginx配置文件说明](docs/conf.md)
* [nginx状态码配置和错误文件](docs/status.md)
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
* [iconfong字体跨域配置](docs/iconfont.md)
* nginx日志切割
* windows中安装nginx

## 常见错误和解决方法

#### nginx: [emerg] getpwnam("nginx") failed

表示该用户`nginx`不存在, 解决方法:

1. 在`nginx.conf`里添加`user nobody;`
2. 创建用户和用户对应的分组


#### nginx: [emerg] getgrnam("xiaowu") failed

表示用户分组不存在, 解决方法:

1. 在`nginx.conf`里添加`user nobody;`
2. 创建用户对应的分组

#### nginx: [alert] could not open error log file: open() "/logs/error.log" failed (13: Permission denied)

启动`nginx`的用户权限不够导致无法写入日志文件, 常见于非`root`用户启动报错

#### nginx: [emerg] bind() to 0.0.0.0:80 failed (48: Address already in use)

80端口被占用启动失败, 修改端口或者杀死占用者再启动即可

#### nginx: [error] open() "nginx.pid" failed (2: No such file or directory)

pid进程id文件不存在, 可能文件被删除或者已经停止, 在停止nginx时会使用该进程id, 如果不存在将失败, 可以手动kill掉


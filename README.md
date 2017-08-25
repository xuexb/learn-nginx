# learn-nginx

学习安装、配置`nginx`, 如果你有什么想学习的case或者想完成某些配置, 可在 [issues](https://github.com/xuexb/learn-nginx/issues) 创建~

## 在学习之前你可能需要掌握的

* linux服务器和一些常用的操作命令
* 域名，当然如果是本地玩玩也可以是`Hosts`
* 基本的正则表达式

## list

> 修改配置文件后需要重启、刷新`nginx`服务, 如: `[sudo] nginx -s reload`

* [nginx配置文件说明](docs/conf.md) - done
* [nginx状态码配置和错误文件](docs/status.md) - done
* [linux中编译安装和配置nginx](docs/linux-make.md) - done
* [重新编译安装](docs/reload-make.md) - done
* [设置主域301重定向](docs/domain.md) - done
* [配置nodejs反向代理](docs/nodejs-proxy.md) - done
* [配置https](docs/https.md) - done
* [nginx配置url重写](docs/url.md) - done
    * [rewrite重写, 301、302跳转](docs/url.md#rewrite)
    * [if判断](docs/url.md#if判断)
    * [location](docs/url.md#location)
* [配置图片防盗链](docs/invalid_referer.md) - done
* [配置CORS跨域](docs/cors.md) - done
* [iconfont字体跨域配置](docs/iconfont.md) - done
* [安装nginx-http-concat](docs/nginx-http-concat.md) - done
* [安装nginx-echo](docs/nginx-echo-module.md) - done
* [nginx日志切割-shell脚本](docs/split-logs.md) - done
* [配置默认主页、目录浏览](docs/autoindex.md) - done
* [配置浏览器缓存](docs/expires.md) - done
* [配置https资源代理](docs/proxy.md) - ing
* [配置nginx前置缓存](docs/cache.md) - ing
* [nginx负载均衡](docs/upstream.md) - ing
* windows中安装nginx

## 常见错误和解决方法

### nginx: [emerg] getpwnam("nginx") failed

表示该用户`nginx`不存在, 解决方法:

1. 在`nginx.conf`里添加`user nobody;`
2. 创建用户和用户对应的分组


### nginx: [emerg] getgrnam("xiaowu") failed

表示用户分组不存在, 解决方法:

1. 在`nginx.conf`里添加`user nobody;`
2. 创建用户对应的分组

### nginx: [alert] could not open error log file: open() "/logs/error.log" failed (13: Permission denied)

启动`nginx`的用户权限不够导致无法写入日志文件, 常见于非`root`用户启动报错

### nginx: [emerg] bind() to 0.0.0.0:80 failed (48: Address already in use)

80端口被占用启动失败, 修改端口或者杀死占用者再启动即可

### nginx: [error] open() "nginx.pid" failed (2: No such file or directory)

pid进程id文件不存在, 可能文件被删除或者已经停止, 在停止nginx时会使用该进程id, 如果不存在将失败, 可以手动kill掉

### nginx: [emerg] unknown "realpath_roots_xxx" variable

变量`$realpath_roots_xxx`不存在
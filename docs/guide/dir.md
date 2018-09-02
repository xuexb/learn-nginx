# Nginx 目录建议

[安装 Nginx](./linux-make.md) 时可以选择配置文件的路径，由于 Nginx 程序后续可能会升级版本，但配置基本上就是一份，那么推荐使用配置和程序分离的方式，遵循：

1. 配置文件独立管理, 不存放在nginx程序目录内
1. 每个站点独立一个配置文件
2. 每个站点独立的日志文件
3. 提取公用的配置文件

如:

```
$dir/wwwroot/                           - 网站根目录，以域名为文件夹名称
    ./xuexb.com/
    ./static.xuexb.com/

$dir/src/                               - 安装源包

$dir/local/nginx/                       - nginx相关根目录
    ./conf/                             - 配置文件
        ./nginx.conf                    - 配置主入口
        ./inc                           - 通用配置
        ./vhost/                        - 各站点的配置，以 `域名.conf` 命名
            ./xuexb.com.conf
            ./static.xuexb.com.conf

    ./1.11.1/                           - 各个版本的nginx
    ./1.11.2/

$dir/logs/                              - 日志相关目录，内以 `域名.type.log` 命名
        ./last/                         - 最新的日志
            ./xuexb.com.error.log
            ./xuexb.com.access.log
        ./back/                         - 天级备份日志
            ./20170908/
```

这样分离之后不管是 Nginx 主程序版本升级，还是修改某个站点配置，还是快速查找某个站点日志都是得心应手~

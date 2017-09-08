# nginx配置目录建议

[安装nginx](./linux-make.md) 时可以选择配置文件的路径, 由于nginx程序可能随时升级, 但配置基本上就是一份, 那么推荐使用配置和程序分离的方式, 遵循:

1. 配置文件独立管理, 不存放在nginx程序目录内
1. 每个站点独立一个配置文件
2. 每个站点独立的日志文件
3. 提取公用的配置文件

如:

```
$HOME/wwwroot/                          - 网站根目录
    ./xuexb.com/                        - 博客网站根目录
    ./static.xuexb.com/                 - 静态文件根目录

$HOME/local/nginx/                      - nginx相关根目录
    ./conf/                             - 配置文件
        ./nginx.conf                    - 配置主入口
        ./vhost/                        - 各站点的配置
            ./xuexb.com.conf            - 博客配置
            ./static.xuexb.com.conf     - 静态域名配置

    ./1.11.1/                           - 各个版本的nginx
    ./1.11.2/

    ./logs/
        ./last/                         - 最新的日志
            ./xuexb.com.error.log       - 博客错误日志
            ./xuexb.com.access.log      - 博客访问日志
        ./back/                         - 备份日志             
```

这样分离之后不管是nginx主程序版本升级, 还是修改某个站点配置, 还是快速查找某个站点日志都是得心应手~

---

你有什么好的建议, 欢迎提 [issue](https://github.com/xuexb/learn-nginx/issues/new?title=nginx%E7%9B%AE%E5%BD%95%E5%BB%BA%E8%AE%AE)
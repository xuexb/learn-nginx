# 常见错误

### 配置不生效

更新配置后使用 `[sudo] /your/path/nginx -s reload` 热重载服务。

### nginx: [emerg] getpwnam("nginx") failed

表示该用户 `nginx` 不存在， 解决方法:

1. 在 `nginx.conf` 里添加 `user nobody;`
2. 创建用户和用户对应的分组

### nginx: [emerg] getgrnam("xiaowu") failed

表示用户分组不存在，解决方法:

1. 在 `nginx.conf` 里添加 `user nobody;`
2. 创建用户对应的分组

### nginx: [alert] could not open error log file: open() "/logs/error.log" failed (13: Permission denied)

启动 Nginx 的用户权限不够导致无法写入日志文件，常见于非 `root` 用户启动报错。

### nginx: [emerg] bind() to 0.0.0.0:80 failed (48: Address already in use)

80端口被占用启动失败，修改端口或者杀死占用者再启动即可。

### nginx: [error] open() "nginx.pid" failed (2: No such file or directory)

pid 进程 id 文件不存在，可能文件被删除或者已经停止，在停止 Nginx 时会使用该进程id，如果不存在将失败，可以手动 kill 掉。

### nginx: [emerg] unknown "realpath_roots_xxx" variable

变量 `$realpath_roots_xxx` 不存在

### nginx: [emerg] "add_header" directive is not allowed here in xx

`add_header` 指令不能直接在 `if` 判断内，可以在 `http`、`server`、`server.location`、`server.location.if` 下。

### nginx: [emerg] "proxy_pass" cannot have URI part in location given by regular expression, or inside named location, or inside "if" statement, or inside "limit_except" block in xx

这是 `proxy_pass` 指令在正则匹配时不能使用包含路径的链接，如以下都会报错：

```nginx
location ~* ^/api/ {
    proxy_pass http://host/;
}

location / {
    if ($uri ~* ^/api/) {
        proxy_pass http://host/;
    }
}
```

解决办法就是把 `/` 去掉，更多关于 `proxy_pass` 请看：[`proxy_pass` 技巧](/example/proxy_pass.html) 。
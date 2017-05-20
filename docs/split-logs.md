# nginx日志切割-shell脚本

由于`nginx`的日志(包括access和error)默认都是存放在一个文件内, 当时间长了, 日志文件体积越来越大, 不易管理, so, 可以自己写个shell脚本来处理, 其实就是定时定点去把日志移动下位置...

```bash
#!/bin/sh

# 日志源目录
sourceDir='/var/log/nginx/xuexb.com/last'

# 日志备份目录
backDir='/var/log/nginx/xuexb.com/back'

echo "split-logs start: $(date +%Y-%m-%d %H:%M:%S)"

ls $sourceDir | while read filename
do
    mkdir -p "$backDir/$(date +%Y%m%d)/"
    mv "$sourceDir/$filename" "$backDir/$(date +%Y%m%d)/"
    echo "$sourceDir/$filename => $backDir/$(date +%Y%m%d)/$filename"
done

# 刷新nginx
kill -USR1 `cat /var/run/nginx.pid`

echo "split-logs end: $(date +%Y-%m-%d %H:%M:%S)"
echo "----------------"
```

有几个注意的:

1. 日志源目录 - 该目录存放日志文件, 如 access.log, error.log, 当然如果你的站点比较多, 可以用域名来命名, 比如: xuexb.com.access.log, xuexb.com.error.log
2. 日志备份目录 - 会以`Ymd`命名文件夹名存放在该目录
3. 刷新`nginx` - 由于是直接移动日志文件, 移动后需要刷新下`nginx`使其再生成日志文件, 当然也可以`nginx -s reload`, 但`reload`要比`kill`的慢
4. 定时任务 - 使用`crontab -e`插入一条定时任务, 定时23:55开始分割, 后面是把错误和信息输出到指定文件, 方便调试, 如:

```
55 23 * * * sh /你的目录/split-log >> /var/log/nginx/crontab.log 2>&1
```

---

当然这只是日志切割的一种, 还有很多种方法~
# 日志切割 - Shell

由于 Nginx 的日志（包括 access 和 error）默认都是存放在一个文件夹内，当时间长了，日志文件体积越来越大，不易管理，可以自己写个脚本来处理，其实就是定时定点去把日志移动下位置。

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

1. 日志源目录 - 该目录存放日志文件，如 access.log，error.log，当然如果你的站点比较多，可以用域名来命名，比如: xuexb.com.access.log，xuexb.com.error.log 。
2. 日志备份目录 - 会以`Ymd`命名文件夹名存放在该目录。
3. 刷新 Nginx - 由于是直接移动日志文件，移动后需要刷新下 Nginx 使其再生成日志文件，当然也可以 `nginx -s reload` ，但 `reload` 要比 `kill` 的慢，而 `kill -USR1` 是无损的。
4. 定时任务 - 需要使用 `root` 帐户下使用 `crontab -e` 插入一条定时任务，定时 23:55 开始分割，后面是把错误和信息输出到指定文件，方便调试，如:

```
55 23 * * * sh /你的目录/split-log >> /var/log/nginx/crontab.log 2>&1
```

---

当然这只是日志切割的一种，还有很多种方法~
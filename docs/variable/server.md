---
pageClass: page-main-max
---

# 服务器相关

变量名 | 备注 | 示例
--- | --- | ---
`nginx_version` | 当前运行的 Nginx 版本号 | 1.11.2
`server_port` | 服务器端口 | 8080
`server_addr` | 服务器端地址 | 127.0.0.1
`server_name` | 服务器名称 | 127.0.0.1
`server_protocol` | 服务器的HTTP版本 | HTTP/1.0
`status` | HTTP 响应代码 | 200
`time_iso8601` | 服务器时间的 ISO 8610 格式  | 2018-09-02T15:14:27+08:00
`time_local` | 服务器时间（LOG Format 格式） | 02/Sep/2018:15:14:27 +0800
`document_root` | 当前请求的文档根目录或别名 | `/home/xiaowu/github/echo.xuexb.com`
`request_filename` | 当前连接请求的文件路径，由 `root` 或 `alias` 指令与 URI 请求生成 |  `/home/xiaowu/github/echo.xuexb.com/api/dump/path`
`request_completion` | 如果请求成功，值为”OK”，如果请求未完成或者请求不是一个范围请求的最后一部分，则为空 | 
`pid` | 工作进程的PID | 1234
`msec` | 当前的Unix时间戳 | 1535872750.954
`limit_rate` | 用于设置响应的速度限制 | 0
`pipe` | 如果请求来自管道通信，值为“p”，否则为“.”  | .
`connection_requests` | TCP连接当前的请求数量 | 1
`connection` | TCP 连接的序列号 | 363861
`realpath_root` | 当前请求的文档根目录或别名的真实路径，会将所有符号连接转换为真实路径 | /home/xiaowu/github/echo.xuexb.com
`hostname` | 主机名 | bj01

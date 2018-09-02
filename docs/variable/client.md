---
pageClass: page-main-max
---

# 客户端相关

变量名 | 备注 | 示例
--- | --- | ---
`http_accept` | 浏览器支持的 MIME 类型 | `text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8`
`http_accept_encoding` | 浏览器支持的压缩编码 | `gzip, deflate, br`
`http_accept_language` | 浏览器支持的语言 | `zh-CN,zh;q=0.9,en;q=0.8`
`http_cache_control` | 浏览器缓存 | `max-age=0`
`http_connection` | 客户端与服务连接类型 | 
`http_cookie` | 浏览器请求 cookie | `a=1; b=2`
`http_host` | 浏览器请求 host | echo.xuexb.com
`http_referer` | 浏览器来源 | https://echo.xuexb.com/
`http_upgrade_insecure_requests` | 是一个请求首部，用来向服务器端发送信号，表示客户端优先选择加密及带有身份验证的响应，并且它可以成功处理 upgrade-insecure-requests CSP 指令 | 1
`http_user_agent` | 用户设备标识 | `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36`
`http_x_requested_with` | 异步请求标识 | true
`http_x_forwarded_for` | 反向代理原 IP | 198.13.61.105
# nginx状态码配置和错误文件

```nginx
server {
    # 配置访问 /test.js 时报403错
    location /test.js {
        return 403;
    }

    # 配置访问 /404 时报404错
    location /404 {
        return 404;
    }

    # 配置访问 /500 时报500错
    location /500 {
        return 500;
    }

    # 把指定状态码指向这个文件uri
    error_page 500 502 503 504 = /status.html;
    error_page 404 = /status.html;
}
```
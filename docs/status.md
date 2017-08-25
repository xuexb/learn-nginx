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

如:

```nginx
server {
    listen 80;
    server_name test.me;

    root /Users/xiaowu/work/test.me;

    # 用if匹配任何以 403 开头的, 会匹配到 /4034444
    if ($request_uri ~* ^/403) {
        return 403;
    }

    # 用location匹配 /500/ /500, 但不匹配 /500/1
    location ~* "^/500/?$" {
        return 500;
    }

    # 用if匹配以 /501/ 开头的, 匹配 /501/1, /501/1/2 但不匹配 /501
    if ($request_uri ~* ^/501/) {
        return 501;
    }

    # 用location匹配 /502/ /502 /502/1 /502/1/2
    location ~* "^/502(/.*)?$" {
        return 502;
    }

    # 用location只匹配 /503
    location = /503 {
        return 503;
    }
}
```
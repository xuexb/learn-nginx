# Nginx 状态码配置和错误文件


```nginx
server {
    # 配置访问 /test.js 时报 403 错
    location /test.js {
        return 403;
    }

    # 配置访问 /404 时报 404 错
    location /404 {
        return 404;
    }

    # 配置访问 /500 时报 500 错
    location /500 {
        return 500;
    }

    # 把指定状态码指向这个文件 uri
    error_page 500 502 503 504 /status.html;
    error_page 404 /status.html;
}
```

如:

```nginx
server {
    listen 80;
    server_name test.me;

    root /Users/xiaowu/work/test.me;

    # 用if匹配任何以 403 开头的，会匹配到 /4034444
    if ($request_uri ~* ^/403) {
        return 403;
    }

    # 用location匹配 /500/ /500，但不匹配 /500/1
    location ~* "^/500/?$" {
        return 500;
    }

    # 用if匹配以 /501/ 开头的，匹配 /501/1，/501/1/2 但不匹配 /501
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

### error_page配置小提示

注意 `error_page` 配置时加 `=` 和不加 `=` 的区别，加了 `=` 表示响应为指定的 `http status code` ，默认为 200，不加 `=` 为原错误的状态码~

```nginx
# 这样可以访问错误页面时 http status 为 404 ，并且页面内容是 404.html 的内容
error_page 404 /404.html
error_page 404 500 /404.html;

# 这样配置访问错误页面时 http status 为 200 ，但页面内容是 404.html 的内容
error_page 404 500 = /404.html;

# 这样配置访问错误页面时 http status 为 404 ，但页面内容是 404.html 的内容
error_page 404 500 =404 /404.html;

# 也可以把404请求直接301到某个域上
error_page 404 =301 https://xuexb.com/404;
```

这样就可以根据自己需求配置错误页为指定的状态码，因为非 200 的状态码可能会被浏览器拦截。

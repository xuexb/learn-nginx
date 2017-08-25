# 配置 nginx CORS 跨域

## 设置允许所有的请求

```nginx
server {
    location / {
        add_header 'Access-Control-Allow-Origin' '*';
    }
}
```

## 只允许GET请求

```nginx
server {
    location / {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Request-Method' 'GET';
    }
}
```

## 请求白名单

```nginx
server {
    location / {
        # 白名单
        if ($http_origin ~* (baidu\.com|github.xuexb.com)$) {
            add_header 'Access-Control-Allow-Origin' '$http_origin';

            # 允许cookie
            add_header 'Access-Control-Allow-Credentials' true;

            # 只允许某些方法
            add_header 'Access-Control-Request-Method' 'GET, POST, OPTIONS';

            # 支持获取其她字段, 需要前端设置 `xhr.withCredentials = true`
            add_header 'Access-Control-Allow-Headers' 'User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
        }
    }
}
```


## link

- [阮一峰的 跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
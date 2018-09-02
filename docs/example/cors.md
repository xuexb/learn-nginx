# 配置 CORS 跨域

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

## iconfont 字体跨域配置


```nginx
server {
    root xxx;

    # 使用location来匹配以字体文件
    location ~* \.(eot|otf|ttf|woff|svg)$ {
        add_header Access-Control-Allow-Origin *;
    }
}
```

但如果你的 `location` 已经配置了, 可以使用 `if` 判断添加, 如:

```nginx
server {
    location / {
        # 使用判断请求文件来添加
        if ($document_uri ~ \.(eot|otf|ttf|woff|svg)$) {
            add_header Access-Control-Allow-Origin *;
        }
    }
}
```
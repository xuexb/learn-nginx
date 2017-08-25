# iconfont字体跨域配置


```nginx
server {
    root xxx;

    # 使用location来匹配以字体文件
    location ~* \.(eot|otf|ttf|woff|svg)$ {
        add_header Access-Control-Allow-Origin *;
    }
}
```

但如果你的`location`已经配置了, 可以使用`if`判断添加, 如:

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

## link

- [使用CORS跨域](./cors.md)
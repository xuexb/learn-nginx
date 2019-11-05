# proxy_pass url 反向代理的坑

说到 Nginx 就不得不说 Nginx 的反向代理是多么的好用，一个指令 `proxy_pass` 搞定反向代理，对于接口代理、负载均衡很是实用，但 `proxy_pass` 指令后面的参数很有讲究。

网上有很多什么绝对路径、相对路径的说法，其实在实际的应用中就分为两种情况：

## url 只是 host

这里指不包含 `$uri` ，如：

- `http://host` - √
- `https://host` - √
- `http://host:port` - √
- `https://host:port` - √
- `http://host/` - x
- `http://host:port/` - x

这时候 `location` 匹配的完整路径将直接透传给 url ，如：

```nginx
// 访问：   /                               后端：   /
// 访问：   /api/xx                         后端：   /api/xx
// 访问：   /api/xx?aa                      后端：   /api/xx?aa
location / {
    proxy_pass http://node:8080;
}

// 访问：   /api/                           后端：   /api/
// 访问：   /api/xx                         后端：   /api/xx
// 访问：   /api/xx?aa                      后端：   /api/xx?aa
// 访问：   /api-xx?aa                      后端：
location /api/ {
    proxy_pass http://node:8080;
}

// 访问：   /api/                           后端：   /api/
// 访问：   /api/xx                         后端：   /api/xx
// 访问：   /api/xx?aa                      后端：   /api/xx?aa
// 访问：   /api-xx?aa                      后端：   /api-xx?aa
location /api {
    proxy_pass http://node:8080;
}
```

## url 包含路径

注意，这里的路径哪怕只是一个 `/` 也是存在的，如：

- `http://host` - x
- `https//host/` - √
- `http://host:port` - x
- `https://host:port/` - √
- `http://host/api` - √
- `http://host/api/` - √

当 `proxy_pass url` 的 `url` 包含路径时，匹配时会根据 `location` 的匹配后的链接透传给 `url` ，注意匹配后就是这样：

| `location` 规则 | 访问的原始链接 | 匹配之后的路径 |
| --- | --- | --- |
| `location /` | `/` | ` ` |
| `location /` | `/a` | `a` |
| `location /` | `/a/b/c?d` | `a/b/c?d` |
| `location /a/` | `/a/` | ` ` |
| `location /a/` | `/a/b/c?d` | `b/c?d` |

明白匹配之后的路径后，在 `proxy_pass url` 包含路径时，将会把匹配之后的路径透传给 `url` ，如：


```nginx
// 访问：   /                               后端：   /
// 访问：   /api/xx                         后端：   /api/xx
// 访问：   /api/xx?aa                      后端：   /api/xx?aa
location / {
    proxy_pass http://node:8080/;
}

// 访问：   /api/                           后端：   /
// 访问：   /api/xx                         后端：   /xx
// 访问：   /api/xx?aa                      后端：   /xx?aa
// 访问：   /api-xx?aa                      未匹配
location /api/ {
    proxy_pass http://node:8080/;
}

// 访问：   /api                            后端：   /
// 访问：   /api/                           后端：   //
// 访问：   /api/xx                         后端：   //xx
// 访问：   /api/xx?aa                      后端：   //xx?aa
// 访问：   /api-xx?aa                      后端：   /-xx?aa
location /api {
    proxy_pass http://node:8080/;
}

// 访问：   /api/                           后端：   /v1
// 访问：   /api/xx                         后端：   /v1xx
// 访问：   /api/xx?aa                      后端：   /v1xx
// 访问：   /api-xx?aa                      未匹配
location /api/ {
    proxy_pass http://node:8080/v1;
}

// 访问：   /api/                           后端：   /v1/
// 访问：   /api/xx                         后端：   /v1/xx
// 访问：   /api/xx?aa                      后端：   /v1/xx
// 访问：   /api-xx?aa                      未匹配
location /api/ {
    proxy_pass http://node:8080/v1/;
}
```

由以上规则可以看出，当 `proxy_pass url` 中包含路径时，结尾的 `/` 最好同 `location` 匹配规则一致。

## 当 proxy_pass 遇到正则

当 `location` 以正则形式匹配时，`proxy_pass` 就不能以 `/` 结束了，也就是不能包含路径了，比如错误的：

```nginx
location ~* ^/api/ {
    proxy_pass http://host/;
}

location / {
    if ($uri ~* ^/api/) {
        proxy_pass http://host/;
    }
}
```

解决办法就是把链接中的路径去掉。

## 重写代理链接 - url rewrite

当原始链接（浏览器访问的链接）和代理服务器链接规则不一致时，可以使用 Nginx URL Rewrite 功能去动态的重写，如：

```nginx
location ~* ^/api/ {
    rewrite ^/api/(.*) /?path=$1 break;
    proxy_pass http://node:8080;
}
```

以上请求会把匹配 `/api/` 的链接重写为 `/?path=` 的链接透传给 `node:8080` 服务，有意思的是当使用 `rewrite` 指令并且生效后，`proxy_pass url` 链接中的路径会被忽略，如：

```nginx
// 访问：   /                               后端：   /node/
// 访问：   /api                            后端：   /node/api
// 访问：   /api/                           后端：   /?path=
// 访问：   /api/a/b/c                      后端：   /?path=a/b/c
location / {
    rewrite ^/api/(.*) /?path=$1 break;
    proxy_pass http://node:8080/node/;
}
```
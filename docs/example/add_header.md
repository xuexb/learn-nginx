# add_header 指令技巧

官方的介绍：

> Adds the specified field to a response header provided that the response code equals 200, 201 (1.3.10), 204, 206, 301, 302, 303, 304, 307 (1.1.16, 1.0.13), or 308 (1.13.0). The value can contain variables.
> 
> There could be several add_header directives. These directives are inherited from the previous level if and only if there are no add_header directives defined on the current level.
> 
> If the always parameter is specified (1.7.5), the header field will be added regardless of the response code.

意思也就是说话在响应状态码**成功**时，`add_header` 指令才生效，并且当前《作用域》下没有 `add_header` 指令时，会向上层继承。

在使用过程中难免会遇到上级指令被覆盖的情况，如：

```nginx
server {
    add_header x-name nginx;

    location / {
        root /path;
    }

    location /static/ {
        add_header x-name2 nginx2;
    }
}
```

当匹配到 `/` 时，由于 `location /` 中没有 `add_header` 指令，所以会继承 `server` 中的 `x-name` ，而当匹配到 `/static/` 时，由于内容已经有 `add_header` 指令，则上层的 `x-name` 不会被继承，导致只会输出 `x-name2` 。

## 使用 include 语法

因为项目中的应用往往配置会有很多，我们可以把具体的功能拆分成独立的配置文件，使用 `include` 引用进来，如：

- `inc/no-cache.conf` - 无缓存
- `inc/cache-max.conf` - 缓存最大
- `inc/sts.conf` - STS
- `inc/xss.conf` - XSS 安全过滤
- `inc/php.conf` - PHP FastCGI
- ...

这样就可以按需引用了，如：

```nginx
location / {
    include inc/sts.conf;
    include inc/security.conf;
    include vhost/xiaoshuo.io/no-cache.conf;
}

# png,jpg 转 webp
location ~* \.(jpg|png|meibanfawojiuxiangchangdianyirangquanzhongdadian)$ {
    include inc/sts.conf;
    include inc/security.conf;
    include vhost/xiaoshuo.io/cache-max.conf;

    if ($cookie_webp = '1') {
        rewrite ^/(.*)$ /$1.webp last;
    }
}
location ~* \.webp$ {
    include inc/sts.conf;
    include inc/security.conf;
    include vhost/xiaoshuo.io/cache-max.conf;
    try_files $uri $uri/ @webp;
}
location @webp {
    content_by_lua_file 'lua/webp.lua';
}

# http-concat + max cache
location /style/js/ {
    include inc/sts.conf;
    include inc/security.conf;
    include vhost/xiaoshuo.io/cache-max.conf;
    concat on;
    concat_types application/javascript;
    concat_max_files 30;
    default_type application/javascript;
}
location /style/css/ {
    include inc/sts.conf;
    include inc/security.conf;
    include vhost/xiaoshuo.io/cache-max.conf;
    concat on;
    concat_types text/css;
    concat_max_files 30;
    default_type text/css;
}

# 时效性高的接口
location ~* ^/((so\/(.+))||ajax)\.php$ {
    include inc/sts.conf;
    include inc/security.conf;
    include vhost/xiaoshuo.io/php.conf;
    add_header cache-control 'private, max-age=0, no-cache';
}

# 其实所有的 php
location ~* \.php$ {
    set $skip_cache 0;
    if ($request_method = POST) {
        set $skip_cache 1;
    }
    if ($arg_nocache = "1") {
        set $skip_cache 1;
    }

    fastcgi_cache_key $scheme$request_method$host$request_uri;
    fastcgi_cache_use_stale
        error
        timeout
        invalid_header
        updating
        http_500
        http_503;
    fastcgi_cache_bypass $skip_cache;
    fastcgi_no_cache $skip_cache;
    fastcgi_cache_valid 200 5m;
    fastcgi_cache_valid any 1m;
    fastcgi_cache m_xiaoshuo_php_cache;

    add_header x-php-cache-status $upstream_cache_status;
    include inc/sts.conf;
    include inc/security.conf;
    include vhost/xiaoshuo.io/cache-small.conf;
    include vhost/xiaoshuo.io/php.conf;
}
```
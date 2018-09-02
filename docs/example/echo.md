# 学习使用 echo 模块

Nginx echo模块是在nginx程序上扩展了 `echo` 输出字符的功能，对于调试很方便，项目地址: <https://github.com/openresty/echo-nginx-module> 。

## 安装

> 目前支持 `nginx-1.11.2`，高版本可能安装失败，我装 `1.11.13` 失败了，更多支持nginx的版本见: [https://github.com/openresty/echo-nginx-module#compatibility](https://github.com/openresty/echo-nginx-module#compatibility)

去 [release](https://github.com/openresty/echo-nginx-module/releases) 下载最新的安装包，并解压.

在配置 Nginx 时用: `./configure --add-module=/你的解压路径`，并编译安装，如果是重新编译安装可参考: [重新编译安装](/guide/linux-install.html#重新编译安装)

## 使用

> 只是研究了一些常用的

### echo - 输出字符

- 语法: `echo [options] <string>...`
- 默认值: `no`

```conf
# 简单的hello，world!
server {
    location = /api/hello {
        echo "hello，world!";
    }
}
```

默认echo会自动换行，不需要换行可以: `echo -n xxx;`;

### echo_before_body，echo_after_body - 页面前、后插入内容

- 语法: `echo_before_body [options] [argument]...`
- 默认值: `no`

```conf
server {
    # 简单的输出
    location = /api/hello {
        echo_before_body echo_before_body;
        echo "hello，world!";
        echo_after_body echo_after_body;
    }

    # 常见于代理页面前、后插内容
    location = /api/proxy_before_after {
        echo_before_body echo_before_body;
        echo_before_body echo_before_body;
        proxy_pass http://127.0.0.1;
        echo_after_body echo_after_body;
        echo_after_body echo_after_body;
    }
}
```

### echo_sleep - 请求等待

- 语法: `echo_sleep <seconds>`
- 默认值: `no`

```conf
server {
    # 简单的输出
    location = /api/sleep {
        echo 1;

        # 等待1秒
        echo_sleep 1;

        echo 2;
    }
}
```

### echo_location_async，echo_location - 请求指定路径

- 语法: `echo_location_async <location> [<url_args>]`
- 默认值: `no`

```conf
location /main {
    # 异步调用/sub
    echo_location_async /sub;

    echo world;
}

location /main2 {
    # 同步调用/sub
    echo_location_async /sub;

    echo world;
}

location /sub {
    echo hello;
}
```

异步跟同步的区别是:

1. 异步会并行的去请求
2. 同步等待当前请求结束才会往下执行

下面这个整个时间为2s，因为新路径最大是2s:
```conf
 location /main {
     echo_location_async /sub1;
     echo_location_async /sub2;
     echo "took $echo_timer_elapsed sec for total.";
 }
 location /sub1 {
     echo_sleep 2;
 }
 location /sub2 {
     echo_sleep 1;
 }
```

下面这个整个时间为3s，因为需要等待`/sub1`完成才进入`/sub2`:
```conf
 location /main {
     echo_location /sub1;
     echo_location /sub2;
     echo "took $echo_timer_elapsed sec for total.";
 }
 location /sub1 {
     echo_sleep 2;
 }
 location /sub2 {
     echo_sleep 1;
 }
```

可以通过第二个参数传`querystring`: `echo_location_async /sub 'foo=Foo&bar=Bar';`

### echo_foreach_split - 分隔循环

- 语法: `echo_foreach_split <delimiter> <string>`

```conf
location /split {
    echo_foreach_split ',' $arg_list;
        echo "item: $echo_it";
    echo_end;
}
```

上面配置当访问: `/split?list=cat,dog,mouse` 时会输出:

```
item: cat
item: dog
item: mouse
```

`$arg_list`是对应`$args.list`

那么配置全`echo_location_async`可以做成`nginx-combo`服务了，如:

```conf
location = /api/combo {
    echo_foreach_split ',' $query_string;
        echo "/* combo: $echo_it */";
        echo_location_async $echo_it;
        echo;
    echo_end;
}
```

访问: `/api/combo?/a.js,/b.js`，需要注意的是文件的路径必须以`/`开始，因为匹配的`location`，当然真的 `nginx-combo` 服务请看: [nginx-http-concat](/example/http-concat.html)

---

其他变量请去官网查看~

## link

- [官网](https://github.com/openresty/echo-nginx-module)
- [我写的在线Demo](//echo.xuexb.com)
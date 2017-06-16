# nginx配置文件说明

转自: [http://blog.twolun.com/post/nginx-conf.html](http://blog.twolun.com/post/nginx-conf.html)

```nginx
# 运行用户，linux系统尤其重要，如出现403 forbidden错误，很有可能是这个没有设置正确
#user  nobody;

# 启动进程数量，通常和cpu的数量相同
worker_processes  1;

# 合局错误日志及pid，当nginx调试时，打开日志功能，会很有用
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

# 工作模式及链接数上限
events {
    #单个后台worker process进程的最大并发链接数
    worker_connections  1024;
}

# 设定http服务器，利用它的反向代理功能实现负载均衡支持
http {
    #设定mime类型,类型由mime.type文件定义
    include       mime.types;
    default_type  application/octet-stream;

    # 设置日志格式
    #log_format  main  "$remote_addr - $remote_user [$time_local] "$request" "
    #                  "$status $body_bytes_sent "$http_referer" "
    #                  ""$http_user_agent" "$http_x_forwarded_for"";

    #access_log  logs/access.log  main;

    # sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，对于普通应用，
    # 必须设为 on,如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，以平衡磁盘与网络I/O处理速度，降低系统的uptime.
    sendfile        on;
    #tcp_nopush     on;

    # 连接超时时间
    #keepalive_timeout  0;
    keepalive_timeout  65;

    # 开启gzip压缩，
    #gzip  on;

    server {
        # nginx监听的端口，
        #listen       8080;
        listen       80;

        # 定义使用www.exam.com访问， 记得一定要配Host
        server_name  www.exam.com;

        #charset koi8-r;

        # 设定本虚拟机的访问日志
        #access_log  logs/host.access.log  main;

        location / {
            # 定义服务器默认网站根目录，如果我们有在别的目录中起服务，这个应该没有什么用？？？
            root   html;

            # 定义首页索引文件的名称
            index  index.html index.htm;
        }

        # 定义q
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache"s document root
        # concurs with nginx"s one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }

    # 加载配的本地虚拟机
    include vhost/*.conf;

    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
        #listen       8000;
    #    listen       80;
    #    server_name  some.stage.com;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    include servers/*;
}
```

## links

- [静态资源web服务器配置详解](http://xuding.blog.51cto.com/4890434/1743666)
- [nginx官方文档](http://nginx.org/en/docs/)
# 配置nginx前置缓存

```conf
http {
    # 定义缓存名称、目录、类型
    proxy_cache_path    /home/proxy/cache levels=1:2 keys_zone=nginx_cache:100m inactive=30d max_size=1g;
    proxy_temp_path     /home/proxy/temp;
    proxy_cache_key     $host$uri$is_args$args;   

    server {
        # 定义缓存的规则
        location ~ ^/(static|upload)\/(.*)$ {
            proxy_connect_timeout    10s;
            proxy_read_timeout       10s;
            proxy_cache              nginx_cache;
            proxy_cache_valid        200 30d;
            proxy_cache_lock         on;
            proxy_cache_lock_timeout 5s;
            proxy_cache_use_stale    updating error timeout invalid_header http_500 http_502;

            # 添加缓存的标识到header头
            add_header               X-Cache "$upstream_cache_status from cache.xuexb";

            expires                  1d;
            proxy_set_header Connection "";
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy true;

            # 目标机器
            proxy_pass  http://blog;
        }
    }
}
```
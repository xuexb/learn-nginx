# 配置https资源代理

```conf
server {
    root /wwwroot/proxy/;

    # 全部代理
    location ~ ^/(.*)$ {
        proxy_connect_timeout    10s;
        proxy_read_timeout       10s;

        proxy_set_header Connection "";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;

        # 代理
        proxy_pass               http://$1;
    }
}
```
# nginx负载均衡

```conf
http {
    upstream blog {
        server 127.0.0.1:8003;
        server 10.170.203.2:8080 weight=3;
    }

    server {
        server_name www.xuexb.com xuexb.com;
        listen 80;

        location / {
            proxy_set_header Connection "";
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy true;
            proxy_pass  http://blog;
        }
        access_log off;
    }
}
```
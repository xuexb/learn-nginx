# 使用 nginx-http-concat

nginx-http-concat 是一个 Nginx 扩展模块，用来合并 HTTP 请求。

## 1. 下载

访问 [https://github.com/alibaba/nginx-http-concat/releases](https://github.com/alibaba/nginx-http-concat/releases) 官网下载最新的源包，如:

```bash
# 下载
wget https://github.com/alibaba/nginx-http-concat/archive/1.2.2.tar.gz

# 解压并记录解压后的目录
tar xzf 1.2.2.tar.gz
```

## 2. 安装

使用 [编译安装](/guide/install.html) ，在配置 configure 时添加参数:

```shell
# 配置
./configure 其他编译参数 --add-module=/刚才解压的目录

# 安装
make
[sudo] make install
```

注意: 如果是重新编译安装时不要运行 `make install`，可参数: [重新编译安装](/guide/linux-install.html#重新编译安装)

如我的配置:

```shell
./configure 
    --...
    --add-module=/home/work/src/nginx-http-concat-1.2.2
```

> 如果有多个 `--add-module` 分别对应写上即可

## 3. 配置

使用 location 匹配到你想要匹配的路径，对其设置参数:

```nginx
server {
    location /static/css/ {
        concat on;
        concat_types text/css;
        concat_max_files 20;
    }
        
    location /static/js/ {
        concat on;
        concat_types application/javascript;
        concat_max_files 30;
    }
}
```

重启服务，如: `nginx -s reload` 。

更新配置项点击: [https://github.com/alibaba/nginx-http-concat#module-directives](https://github.com/alibaba/nginx-http-concat#module-directives)

## 4. 使用

现在就可以通过url中的`??`来合并了，比如: `/static/css/??a.css,path/b.css` 。
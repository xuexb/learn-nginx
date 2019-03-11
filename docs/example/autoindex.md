# 配置默认主页、目录浏览

## 设置默认主页

直接可以使用目录形式打开的页面称为默认主页，一般常见的有: `index.html`、`index.htm`、`index.php` 这些，要吧通过配置来完成，如:

```nginx
server {
    root /网站根目录;

    # 设置默认主页，支持多个，按优先级来，空格分格
    index index.html index.htm index.php;
}
```

## 设置目录浏览

当一个目录内没有默认主页的文件时，直接访问目录会报 `403 Forbidden` 错误，而启用目录浏览功能后可以直接列出当前目录下的文件、文件夹，如:

```nginx
server {
    root /网站根目录;

    # 优先使用默认主页
    index index.html index.htm;

    # 当默认主页不存在时直接列出目录内文件树
    autoindex on;
}
```

但多 `autoindex` 相关可官方文档: [http://nginx.org/en/docs/http/ngx_http_autoindex_module.html](http://nginx.org/en/docs/http/ngx_http_autoindex_module.html)

注意，**线上运行环境最好别开启该配置**，因为这将直接暴露你的文件~
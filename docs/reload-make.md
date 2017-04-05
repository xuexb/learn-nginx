# 重新编译安装

是指已经安装成功, 但想对 nginx 添加个模块或者修改配置时需要重新编译

## 1. 下载对应版本 (如果不想更新版本可以忽略)

> 可以使用 `nginx -V` 查看当前程序的编译参数

```shell
# 下载
wget http://nginx.org/download/nginx-1.11.13.tar.gz

# 解压
tar xzf nginx-1.11.13.tar.gz
```

## 2. 重新编译

```shell
# 配置
./configure --prefix=xxx 你的新参数

# 编译
[sudo] make
```

这时侯切记不要`make install`, 因为`make install`就会把文件复制到安装目录

## 3. 复制程序

```shell
# 新复制老版本, 以防出错
cp /path/nginx /path/nginx.back

# 停止服务
/path/nginx -s stop

# 复制新版本到安装目录
cp objs/nginx /path/nginx

# 查看新版本
/path/nginx -t

# 启动新版本
/path/nginx
```

注意: 如果在运行中直接覆盖`nginx`会报: `cp: 无法创建普通文件"nginx": 文本文件忙`


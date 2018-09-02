#!/bin/sh
# 主要处理 VuePress 生成的文件，移动到 learn-nginx 二级目录中

mkdir netlify
mv dist learn-nginx
mv learn-nginx netlify
echo '<html><meta http-equiv="refresh" content="0;url=learn-nginx/"></html>' > netlify/index.html
# 配置图片防盗链

防盗链是指当图片不是自己网站打开时返回 403 或者指定图片，是通过请求的来路判断是否是自己的站点来设置响应。

### 语法

`valid_referers none | blocked | server_names | string`

* `none`：表示没有来路
* `blocked`：表示有来路
* `server_names`：来路里包含当前域名
* `string`：（忽略端口）
    * 如果是字符串：一个域名验证的规则，`*` 表示通配符
    * 如果是以 `~` 开头：正则表达式，排除https://或http://开头的字符串

以上参数可以叠加一起使用。

### 例子

```conf
server {

    # 配置所有图片
    location ~* \.(gif|jpg|png|bmp)$ {
        # 验证可以是没有来路、或者有来路时来路匹配xuexb.com、或者匹配当前域名
        valid_referers none blocked *.xuexb.com server_names;

        # 如果验证不通过则返回403
        if ($invalid_referer) {
            return 403;
        }
    }
}
```
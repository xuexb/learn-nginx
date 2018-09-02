---
pageClass: page-main-max
---

# 链接相关

变量名 | 备注 | 示例
--- | --- | ---
`scheme` | 请求使用的 WEB 协议 | http
`uri` | 请求中的当前 URI(不带请求参数)，可以不同于浏览器传递的 `$request_uri` 的值，它可以通过内部重定向，或者使用 `index` 指令进行修改 | `/api/dump/path`
`document_uri` | 同 `$uri` | `/api/dump/path`
`request_uri` | 这个变量等于包含一些客户端请求参数的原始 URI ，它无法修改 | `/api/dump/path?a=1&%E4%B8%AD%E6%96%87=%E5%A5%BD%E7%9A%84`
`request_method` | HTTP 请求方法 | GET
`request_time` | 处理客户端请求使用的时间，从读取客户端的第一个字节开始计时 | 0.000
`request_length` | 请求的长度（包括请求地址、请求头和请求主体） | 678
`args` | 请求参数 | `a=1&%E4%B8%AD%E6%96%87=%E5%A5%BD%E7%9A%84`
`query_string` | 同 `$args` | 
`is_args` | 请求中是否有参数，有则为 `?` 否则为空 | `?`
`arg_参数名` | 请求中具体的参数 | `$arg_a` => `1`
`https` | 如果开启了 SSL 安全模式，则为 `on` 否则为空 | `on`
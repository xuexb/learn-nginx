# 贡献指南

非常感谢您关注 Nginx 入门教程项目，在提交您的贡献之前，请务必认真阅读以下准则。

- [问题反馈](#Issue)
- [开发指南](#develop)
    - [常用脚本命令（npm scripts）](#npm-scripts)
    - [项目结构](#dir-spec)
    - [提交请求（pull request）](#pull-request)
- [文档说明](#docs-spec)

<a id="Issue"></a>
## 问题反馈

- 请避免提交重复的 Issue，在提交之前搜索现有的 Issue 。
- 请确定 Issue 的类型，并在 Issue 内容描述清晰，我们将根据内容对 Issue 打上对应的 label 。

<a id="develop"></a>
## 开发设置

项目依赖 VuePress ，需要安装 [Node.js](https://nodejs.org/) 版本8+ ，下载项目到本地后安装依赖 `yarn install` 。

<a id="npm-scripts"></a>
### 常用脚本命令（npm scripts）

``` bash
# 启动本地 HTTP 服务器用来本地预览
$ npm run dev

# 编译 markdown 文档为 html 文件
$ npm run build
```

<a id="dir-spec"></a>
### 项目结构

```
docs                - 文档目录
├── .vuepress       - 文档配置
├── README.md       - 文档首页
├── config          - 配置文档目录
├── example         - 示例文档目录
├── guide           - 入门文档目录
└── variable        - 变量文档目录
```

<a id="pull-request"></a>
### 提交请求（pull request）

1. fork [mipengine/www.mipengine.org](https://github.com/mipengine/www.mipengine.org)
1. 把个人仓库（repository）克隆到电脑上，并安装所依赖的插件。
1. 开始编辑文件，可以通过命令 `npm run dev` 预览编辑的效果。
1. 推送（push）分支。
1. 建立一个新的合并申请（pull request）并描述变动。

<a id="docs-spec"></a>
## 文档说明

- 文档基于 Markdown 格式编写。
- 文档编辑地址可通过访问文档右上角编辑按钮获得。
- 文档内链接使用绝对路径，如： `[新的起点](/guide/dir.html)` 。
- 使用中文半角标点符号。
- 名词区分大小写。
- 英文、代码、链接前后添加空格。
- 新增文档需要添加文档对应的目录配置（`docs/.vuepress/config.js`）。
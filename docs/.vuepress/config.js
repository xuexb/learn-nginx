module.exports = {
    dest: 'dist',
    base: '/learn-nginx/',
    locales: {
      '/': {
        lang: 'zh-CN',
        title: 'Nginx 入门教程',
        description: '学习 Nginx 配置, 包括: 编译安装、反向代理、重定向、重写、缓存、跨域配置等',
      },
    },
    head: [
      ['link', { rel: 'icon', href: `/logo.jpg` }],
    ],
    themeConfig: {
      repo: 'xuexb/learn-nginx',
      editLinks: true,
      docsDir: 'docs',
      locales: {
        '/': {
          label: '中文',
          selectText: '语言',
          editLinkText: '编译该页面',
          lastUpdated: '最后更新',
          nav: [
            {
              text: '入门',
              link: '/guide/',
            },
            {
              text: '变量',
              link: '/variable/',
            },
            {
              text: '示例',
              link: '/example/',
            },
          ],
          sidebar: {
            '/guide/': genSidebarConfigGuide('入门'),
            '/variable/': genSidebarConfigVariable('变量'),
          }
        },
      }
    }
  }

  function genSidebarConfigGuide (title) {
    return [
      {
        title,
        collapsable: false,
        children: [
          '',
          'dir',
          'linux-install',
          'nginx-configure-descriptions',
          'error',
        ]
      }
    ]
  }

  function genSidebarConfigVariable (title) {
    return [
      {
        title,
        collapsable: false,
        children: [
          '',
          'server',
          'client',
          'url',
        ]
      }
    ]
  }

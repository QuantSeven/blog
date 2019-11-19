const utils = require('./utils')
module.exports = {
  title:'村头柒哥',
  description: '个人笔记',
  base: '/',
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
        lang: 'zh-CN',// 将会被设置为 <html> 的 lang 属性
        // 没有声明 title 或者 description，VuePress 将会尝试使用配置顶层的对应值
        title: '村头柒哥',
        description: '个人笔记',
    }
  },
  theme: '@vuepress/theme-vue',
  themeConfig: {
      logo: '/images/avatar.png',
      // 搜索设置
      search: true,
      searchMaxSuggestions: 10,
      // 将会自动在每个页面的导航栏生成生成一个 GitHub 链接，以及在页面的底部生成一个 "Edit this page" 链接。
      editLinks: true,
      editLinkText: '在 GitHub 上编辑此页',
      // 最后更新时间
      lastUpdated: '上次更新',
      // 作者
      author: 'QuantSeven',
      nav: [
        { text: '编程技术', link: '/note/' },
        { text: '生活兴趣', link: '/life/' },
        { text: '关于我', link: '/about/' },
      ] ,
      // 侧边栏 用工具自动获取文件夹结构,auto自动形成侧边导航
      sidebar: utils.rootFolder("./docs/"),
  },
  // 插件
  plugins: [
    // 评论插件valine
    [
      'vuepress-plugin-comment',
      {
        choosen: 'valine', 
        // options选项中的所有参数，会传给Valine的配置
        options: {
          el: '#valine-vuepress-comment',
          appId: '211iGfKcVvCGNUR4NQeITCHS-gzGzoHsz',
          appKey: 'oiH0rzqpoTI8u3J71xR5dj81'
        }
      }
    ],
    // 返回顶部按钮true显示、false不显示
    ['@vuepress/back-to-top', true],

    ['@vuepress/pwa', {
        // 如果设置为 true，VuePress 将自动生成并注册一个 Service Worker，用于缓存页面的内容以供离线使用（仅会在生产环境中启用）
        serviceWorker: true,
        // 使用自定义组件
        // popupComponent: 'MySWUpdatePopup',
        // 本选项开启了一个用于刷新内容的弹窗。这个弹窗将会在站点有内容更新时显示出来，并提供了一个 refresh 按钮，允许用户立即刷新内容。
        // updatePopup: true
        updatePopup: {
            message: "发现新内容可用",
            buttonText: "刷新"
        }
    }],
    // 用于缩放图像的JavaScript库
    ['@vuepress/medium-zoom', true],
    ['container', {
        type: 'vue',
        before: '<pre class="vue-container"><code>',
        after: '</code></pre>',
    }],
    ['container', {
        type: 'upgrade',
        before: info => `<UpgradePath title="${info}">`,
        after: '</UpgradePath>',
    }]
  ],
  markdown: {
      // 是否在每个代码块的左侧显示行号。
      lineNumbers: false
  },
}

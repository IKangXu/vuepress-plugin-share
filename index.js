const { resolve } = require('path')

module.exports = (options, ctx) => ({
  define () {
    const { supports } = options
    const { pages, themeConfig, siteConfig } = ctx
    return {
      define_supports: supports || ['qq-qzone', 'renren', 'douban', 'sina-weibo', 'wechat', 'tieba-baidu', 'qq']
    }
  },
  name: '@ikangxu/vuepress-plugin-share',
  enhanceAppFiles: resolve(__dirname, './bin/enhanceAppFile.js'),
  globalUIComponents: 'Share'
})
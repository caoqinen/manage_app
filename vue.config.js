module.exports = {
  // 代理服务器
  devServer: {
    proxy: {
      '/api1': {
        timeout: 30000,
        target: 'https://test.zuul.zhongkangronghua.cn',
        changeOrigin: true,
        pathRewrite: {
          "^/api1": "https://test.zuul.zhongkangronghua.cn"
        }
      },
      '/api': {
        timeout: 30000,
        target: 'https://zuul.zhongkangronghua.cn',
        changeOrigin: true,
        pathRewrite: {
          "^/api": "https://zuul.zhongkangronghua.cn"
        }
      },
    },
    // host: '192.168.10.71'
  },
  outputDir: '../../web/manage/src/main/resources/static'
}
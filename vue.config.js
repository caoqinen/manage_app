module.exports = {
  // 代理服务器
  devServer: {
    proxy: {
      '/api': {
        timeout: 30000,
        target: 'https://test.zuul.zhongkangronghua.cn',
        changeOrigin: true,
        pathRewrite: {
          "^/api": "https://test.zuul.zhongkangronghua.cn"
        }
      },
    },
    // host: '192.168.10.30'
  },
  outputDir: '../../web/manage/src/main/resources/static'
}
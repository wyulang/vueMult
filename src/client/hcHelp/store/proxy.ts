module.exports = {
  '/hcHelp': {
    target: 'http://baikehuicai.com/api',
    changeOrigin: true,
    pathRewrite: { '^/hcHelp': '' }
  }
}
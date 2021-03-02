module.exports = {
  lintOnSave: false,
  configureWebpack:{
    resolve:{
      alias:{
        'components': '@/components',
        'assets':'@/assets',
        'network':'@/network',
        'pages': '@/pages',
        'store': '@/store'
      }
    }
  }
}
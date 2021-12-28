process.env.VUE_APP_VERSION = require('./package.json').version
module.exports = {
  publicPath: '/',
  chainWebpack: config => {
    config.module.rules.delete('eslint')
  },
  transpileDependencies: ['resize-detector'],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}


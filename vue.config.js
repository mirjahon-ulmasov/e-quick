process.env.VUE_APP_VERSION = require('./package.json').version
module.exports = {
  publicPath: '/',
  transpileDependencies: [
    'resize-detector'
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}


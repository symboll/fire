// const path = require('path')

// const resolve = dir => path.join(__dirname, dir)

const BASE_URL = process.env.NODE_ENV === 'production' ? './' : '/'
module.exports = {
  lintOnSave: false,
  publicPath: BASE_URL,
  chainWebpack: config => {
    // config.resolve.alias
    //   .set('@', resolve('src'))
    //   .set('_c', resolve('src/components'))
    // config.resolve.extensions
    //   .add('.js')
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  productionSourceMap: false
  // devServer: {
  //   proxy: 'http://localhost:8000'
  // }
}

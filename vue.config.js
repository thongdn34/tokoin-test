const compression = require('compression')

module.exports = {
  publicPath: './',
  pages: {
    app: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: false
      }
    }
  },
  filenameHashing: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "~@/assets/styles/importer";
        `
      }
    }
  },
  chainWebpack (config) {
    config.optimization.delete('splitChunks')
  },
  devServer: {
    open: true,
    before (app) {
      app.use(compression())
    }
  }
}

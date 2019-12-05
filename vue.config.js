module.exports = {
  pages: {
    index: {
      entry: 'src/web/main.js',
      template: 'src/web/public/index.html',
      filename: 'index.html'
    }
  },
  css: {
    loaderOptions: {
      less: {
        sourceMap: true,
        javascriptEnabled: true
      }
    }
  }
}

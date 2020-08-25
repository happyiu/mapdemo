module.exports = {
  chainWebpack: config => {
    config.externals([ {'AMap': 'window.AMap'} ]);
  },
}
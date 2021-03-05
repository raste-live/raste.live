module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = "raste.live";
        return args;
      })
  },
  transpileDependencies: [
    'vuetify'
  ]
}

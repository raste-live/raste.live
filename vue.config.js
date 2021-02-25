module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = "Raste.live";
        return args;
      })
  },
  transpileDependencies: [
    'vuetify'
  ]
}

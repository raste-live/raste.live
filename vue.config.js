module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = "raste.live";
        args[0].description = "24/7 애니송 & J-POP 인터넷 라디오 스트리밍 채널";
        args[0].brandImageUrl = "https://raste.live/brand.jpg";
        return args;
      })
  },
  transpileDependencies: [
    'vuetify'
  ]
}

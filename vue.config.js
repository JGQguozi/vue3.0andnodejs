// const goods = require('@/data/goods.json')

module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: "./", // 公共文件夹
  outputDir: "dist", // 打包后存放静态资源的文件夹( 指定一下 )
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV !== "production" ? "default" : false,
  devServer: {
    host: "localhost",
    port: 9999, // 端口
    // open: true,
    // https: false,
    // hotOnly: false,
    proxy: {
      // 配置跨域
      "/api": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
        // pathRewrite: {
        //   /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
        //     实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
        //    */
        //   '^/api': '/api',
        // },
      }
    },
    // css: {
    //   loaderOptions: {
    //     // 设置 scss 公用变量文件
    //     sass: {
    //       prependData: "@import '~@/assets/style/public.scss';",
    //     },
    //   },
    // },
    before(app) {
      // app.get('/api/goods', (request, reslove) => {
      //   reslove.json(goods)
      // })
    }
  }
};

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      'api':{
        target: 'http://gmall-h5-api.atguigu.cn',        //代理目标的基础路径
        // pathRewrite: { '^/api': '' },
        ws: true,                           
        changeOrigin: true,
      }
    }
  }
})

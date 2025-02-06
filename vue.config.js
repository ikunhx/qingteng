const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' }
        }
      ]
    }
  },
  // 添加 devServer 配置以更改端口号
  devServer: {
    port: 888, // 更改为你想要使用的端口号
    // 其他 devServer 配置...
  }
})
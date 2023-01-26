const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    proxy:"http://localhost:3001",
    allowedHosts: 'all',
    headers:{
        "Cache-Control": "no-cache"
    }
  }
})

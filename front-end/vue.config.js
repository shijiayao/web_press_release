const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:12580'
      },
      '/static': {
        target: 'http://127.0.0.1:12580'
      }
    }
  }
});

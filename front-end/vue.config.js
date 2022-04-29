const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/image': {
        target: 'http://127.0.0.1:12580'
      }
    }
  }
});

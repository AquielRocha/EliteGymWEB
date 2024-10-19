// Arquivo: next.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  webpack: (config, { isServer }) => {
    // Adiciona o MiniCssExtractPlugin apenas no lado do cliente
    if (!isServer) {
      config.plugins.push(new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash].css',
        chunkFilename: 'static/css/[id].[contenthash].css',
      }));
    }

    return config;
  },
};

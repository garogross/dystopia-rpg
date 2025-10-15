const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.plugins = webpackConfig.plugins.map((plugin) => {
        if (plugin instanceof MiniCssExtractPlugin) {
          return new MiniCssExtractPlugin({
            ...plugin.options,
            ignoreOrder: true, // suppress conflicting order errors
          });
        }
        return plugin;
      });
      return webpackConfig;
    },
  },
};

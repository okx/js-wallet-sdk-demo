const webpack = require("webpack");

const overrideWebpack = (config) => {
  config.ignoreWarnings = [/Failed to parse source map/];
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert/"),
    buffer: require.resolve("buffer/"),
  });

  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  return config;
};

const okxProxy = {
  target: "https://www.okx.com",
  changeOrigin: true,
};
const overrideDevServer = (configFunction) => {
  return (proxy, allowedHost) => {
    const newProxy = {
      ...proxy,
      "/api/v5/waas": okxProxy,
    };
    console.log(newProxy);
    const config = configFunction(proxy, allowedHost);
    config.host = "localhost";
    console.log(config);
    return config;
  };
};

module.exports = {
  webpack: overrideWebpack,
  devServer: overrideDevServer,
};
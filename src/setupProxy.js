const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = {
  target: "https://www.okx.com",
  changeOrigin: true,
};
module.exports = function (app) {
  app.use("/api/v5/waas", createProxyMiddleware(proxy));
};

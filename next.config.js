const webpack = require("webpack");
const path = require("path");

const nextConfig = {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  }
}

module.exports = nextConfig;

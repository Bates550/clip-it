const path = require("path");

const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development",
  entry: "./browserAction/index.js",
  output: {
    path: path.resolve(__dirname, "browserAction"),
    filename: "dist/bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [/*"vue-style-loader",*/ "css-loader"],
      },
    ],
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
  ],
};

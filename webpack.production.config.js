/**
 * This is the Webpack configuration file for production.
 */
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var webpack = require("webpack");
var CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main",

  output: {
    path: __dirname + "/build/",
    filename: "app.js",
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!@ffmpeg).*/,
        loader: "babel-loader",
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("css-loader!less-loader"),
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=1&name=[name].[ext]",
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=8192&name=images/[name].[ext]",
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
  },

  plugins: [
    new ExtractTextPlugin("styles.css", { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new CopyPlugin([
      {
        from: __dirname + "/public",
        to: __dirname + "/build/public",
      },
    ]),
  ],
  resolveLoader: {
    root: path.join(__dirname, "node_modules"),
  },

  resolve: {
    extensions: ["", ".js", ".jsx"],
  },

  node: {
    fs: 'empty'
  },

  devServer: {
    info: true,
  },
};

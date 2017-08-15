const { root } = require('./helpers');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

/**
 * This is a common webpack config which is the base for all builds
 */
module.exports = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: root('dist')
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: '@ngtools/webpack' },
      { test: /\.html$/, loader: 'raw-loader' },
      {
        test: /\.css$/,
        // the lines below do not work with AOT unfortunately
        loader: ['to-string-loader'].concat(ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        }))

        // the lines below work with AOT but the solution isn't ideal in my opinion
        // loaders: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        // the lines below do not work with AOT unfortunately
        loader: ['to-string-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before less-loader if necessary 
          use: ['css-loader', 'less-loader']
        }))

        // the lines below work with AOT but the solution isn't ideal in my opinion
        // loaders: ['to-string-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "styles.css", 
      allChunks: true
    })
  ]
};

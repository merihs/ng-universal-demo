const { root } = require('./helpers');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');

const minimizeCss = false;

const postcssPlugins = function () {
  // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
  const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
  const minimizeOptions = {
      autoprefixer: false,
      safe: true,
      mergeLonghand: false,
      discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
  };
  return [
      postcssUrl({
          url: (URL) => {
              // Only convert root relative URLs, which CSS-Loader won't process into require().
              if (!URL.startsWith('/') || URL.startsWith('//')) {
                  return URL;
              }
              if (deployUrl.match(/:\/\//)) {
                  // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                  return `${deployUrl.replace(/\/$/, '')}${URL}`;
              }
              else if (baseHref.match(/:\/\//)) {
                  // If baseHref contains a scheme, include it as is.
                  return baseHref.replace(/\/$/, '') +
                      `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
              }
              else {
                  // Join together base-href, deploy-url and the original URL.
                  // Also dedupe multiple slashes into single ones.
                  return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
              }
          }
      }),
      autoprefixer(),
  ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
};

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
        "test": /\.css$/,

        // the lines below do not work with AOT unfortunately
        "use": ['to-string-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              "loader": "css-loader",
              "options": {
                "sourceMap": true,
                "importLoaders": 1
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "sourceMap": true,
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            }
          ]
        }))

        // the lines below work with AOT but I don't like that solution
        // as the styles are included in the HTML
        // "use": [
        //   "style-loader",
        //   {
        //     "loader": "css-loader",
        //     "options": {
        //       "sourceMap": true,
        //       "importLoaders": 1
        //     }
        //   },
        //   {
        //     "loader": "postcss-loader",
        //     "options": {
        //       "sourceMap": true,
        //       "ident": "postcss",
        //       "plugins": postcssPlugins
        //     }
        //   }
        // ]
      },
      {
        "test": /\.less$/,

        // the lines below do not work with AOT unfortunately
        "use": ['to-string-loader'].concat(ExtractTextPlugin.extract({
          fallback: "exports-loader?module.exports.toString()",
          use: [
            {
              "loader": "css-loader",
              "options": {
                "sourceMap": true,
                "importLoaders": 1
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "sourceMap": true,
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            },
            {
              "loader": "less-loader",
              "options": {
                "sourceMap": true
              }
            }
          ]
        }))

        // the lines below work with AOT but I don't like that solution
        // as the styles are included in the HTML
        // "use": [
        //   "exports-loader?module.exports.toString()",
        //   {
        //     "loader": "css-loader",
        //     "options": {
        //       "sourceMap": true,
        //       "importLoaders": 1
        //     }
        //   },
        //   {
        //     "loader": "postcss-loader",
        //     "options": {
        //       "sourceMap": true,
        //       "ident": "postcss",
        //       "plugins": postcssPlugins
        //     }
        //   },
        //   {
        //     "loader": "less-loader",
        //     "options": {
        //       "sourceMap": true
        //     }
        //   }
        // ]
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

/**
 * @desc note: multicompiler pattern used for multi webpack patterns
 *             https://github.com/webpack/webpack/tree/master/examples/multi-compiler
 * @type {module:path}
 */
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Common configuration
var config = {
  module: {},
};

const jsConfig = Object.assign({}, config, {
  entry: {
    main: './_js-src/main.js',
    mainSm: './_js-src/mainSm.js',
  },
  output: {
    path: path.resolve(__dirname, './js'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
});

const scssConfig = Object.assign({}, config, {
  entry: {
    styleSm: './_scss/style-sm.scss',
  },
  output: {
    path: path.resolve(__dirname, './css'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: [
          MiniCssExtractPlugin.loader, // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          {
            // note: don't use postcss-loader without 'css-loader'
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  'browsers': ['last 5 versions']
                }),
                require('cssnano')() // minifies css
              ],
            }
          },
          "sass-loader", // compiles Sass to CSS, using Node Sass by default
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].min.css",
      chunkFilename: "chunck.css"
    })
  ]
});

module.exports = [ jsConfig, scssConfig ];


const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'dist');

/**
 * @module webpack.config
 * @type {Object}
 */
module.exports = {
  bail: true,
  entry: {
    dist: [
      '../components/index.scss',
      '../components/index.js',
    ],
  },

  output: {
    path: outputDir,
    filename: 'ui-bundle.js',
    library: 'TravixUIKit',
    libraryTarget: 'var',
  },

  externals: {
    react: 'React',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/i,
        exclude: /(node_modules)/,
        loader: 'babel',
      },
      {
        test: /\.s?css$/i,
        loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass']),
      },
    ],
  },

  postcss: () => {
    return [autoprefixer({
      browsers: [
        'last 2 versions',
        'iOS >= 8',
        'Safari >= 8',
      ],
    })];
  },

  plugins: [
    new ExtractTextPlugin('ui-bundle.css'),
  ],
};

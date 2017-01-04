var path = require('path');

module.exports = {
  context: __dirname + '/lib',
  entry: './entry.js',
  output: {
    path: __dirname + '/src',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: 'es2015'
        }
      }
    ]
  },
};

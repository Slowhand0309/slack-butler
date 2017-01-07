var path = require('path');

require('dotenv').config();

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
      },
      {
        test: /\.js$/,
        loader: 'string-replace',
        exclude: /(node_modules|bower_components)/,
        query: {
          multiple: [
            { search: '$TIME_ZONE', replace: process.env.TIME_ZONE },
            { search: '$CALENDAR_ID', replace: process.env.CALENDAR_ID },
            { search: '$EVENT_NOTIFY_TITLE', replace: process.env.EVENT_NOTIFY_TITLE },
            { search: '$SLACK_URL', replace: process.env.SLACK_URL },
            { search: '$SLACK_CHANNEL', replace: process.env.SLACK_CHANNEL },
            { search: '$SLACK_USERNAME', replace: process.env.SLACK_USERNAME },
            { search: '$SLACK_ICONURL', replace: process.env.SLACK_ICONURL }
          ]
        }
      }
    ]
  },
};

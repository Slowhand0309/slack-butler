var path = require('path');
var GasPlugin = require("gas-webpack-plugin");

require('dotenv').config();

module.exports = {
  context: __dirname + '/lib',
  entry: './entry.js',
  output: {
    path: __dirname + '/src',
    filename: 'main.js'
  },
  plugins: [
    new GasPlugin()
  ],
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
            { search: '$MORNING_MESSAGE', replace: process.env.MORNING_MESSAGE },
            { search: '$TIME_ZONE', replace: process.env.TIME_ZONE },
            { search: '$CALENDAR_ID', replace: process.env.CALENDAR_ID },
            { search: '$CALENDAR_NOEVENT', replace: process.env.CALENDAR_NOEVENT },
            { search: '$EVENT_NOTIFY_TITLE', replace: process.env.EVENT_NOTIFY_TITLE },
            { search: '$SLACK_URL', replace: process.env.SLACK_URL },
            { search: '$SLACK_CHANNEL', replace: process.env.SLACK_CHANNEL },
            { search: '$SLACK_USERNAME', replace: process.env.SLACK_USERNAME },
            { search: '$SLACK_ICONURL', replace: process.env.SLACK_ICONURL },
            { search: '$SLACK_SENT_TOKEN', replace: process.env.SLACK_SENT_TOKEN },
            { search: '$SLACK_TRIGGER_WORD', replace: process.env.SLACK_TRIGGER_WORD },
            { search: '$TRANSLATE_FROM', replace: process.env.TRANSLATE_FROM },
            { search: '$TRANSLATE_TO', replace: process.env.TRANSLATE_TO },
            { search: '$TRELLO_NOTIFY_TITLE', replace: process.env.TRELLO_NOTIFY_TITLE },
            { search: '$TRELLO_USER', replace: process.env.TRELLO_USER },
            { search: '$TRELLO_KEY', replace: process.env.TRELLO_KEY },
            { search: '$TRELLO_TOKEN', replace: process.env.TRELLO_TOKEN },
            { search: '$TRELLO_LISTID', replace: process.env.TRELLO_LISTID },
            { search: '$WEATHER_TITLE', replace: process.env.WEATHER_TITLE },
            { search: '$WEATHER_CITYID', replace: process.env.WEATHER_CITYID },
            { search: '$RECIPE_TITLE', replace: process.env.RECIPE_TITLE },
            { search: '$RECIPE_APPID', replace: process.env.RECIPE_APPID }
          ]
        }
      }
    ]
  },
};

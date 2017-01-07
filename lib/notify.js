
export class Notify {

  constructor() {
  }

  /**
   * Post to slack.
   *
   * @param {String} post text
   */
  postSlack(text) {
    Logger.log(`post to slack: ${text}`);

    const payload = {
      'text': text,
      'channel': '$SLACK_CHANNEL',
      'username': '$SLACK_USERNAME',
      'icon_url': '$SLACK_ICONURL'
    };
    let result = this.post('$SLACK_URL', payload);
    Logger.log(result.getContentText('UTF-8'));
  }

  /**
   * Post to url with payload.
   *
   * @param {String} url
   * @param {Object} payload
   */
  post(url, payload) {
    const options = {
      'method': 'POST',
      'payload': JSON.stringify(payload)
    };
    return UrlFetchApp.fetch(url, options);
  }
}

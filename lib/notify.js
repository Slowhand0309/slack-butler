
export class Notify {

  constructor() {
  }

  /**
   * Post to slack.
   *
   * @param {Object} content
   */
  postSlack(content) {
    Logger.log(`post to slack: ${content}`);

    let payload = {
      'channel': '$SLACK_CHANNEL',
      'username': '$SLACK_USERNAME',
      'icon_url': '$SLACK_ICONURL'
    };

    if (typeof content === "string") {
      payload['text'] = content;
    } else {
      payload['attachments'] = content;
    }

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

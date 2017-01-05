
export class Notify {

  constructor() {
  }

  pushMessage(message) {
    Logger.log(`push message: ${message}`);

    const url = 'https://api.line.me/v2/bot/message/push';
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer $CHANNEL_ACCESS_TOKEN"
    };

    const postData = {
      "to": "$PUSH_TARGET",
      "messages": [
        {
          "type": "text",
          "text": message
        }
      ]
    };

    const options = {
      "method": "post",
      "headers": headers,
      "payload": JSON.stringify(postData);
    };

    UrlFetchApp.fetch(url, options);
  }
}

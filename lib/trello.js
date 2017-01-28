
export class Trello {

  /**
   * Constructor
   *
   * @param {String} username
   * @param {String} trello key
   * @param {String} trello token
   */
  constructor(user, key, token) {
    this.user = user;
    this.key = key;
    this.token = token;
  }

  /**
   * Get boards.
   *
   * @return object with json format
   * <pre>
   * [
   *  {
   *    name: 'board_name',
   *    id: 'board_id'
   *  },
   *  {
   *    ...
   *  }
   * ]
   * </pre>
   */
  getBoards() {
    const url = `https://trello.com/1/members/${this.user}/boards?key=${this.key}&token=${this.token}&fields=name`;
    return this.fetch(url);
  }

  /**
   * Get lists in specfic board.
   *
   * @param {String} board id
   * @return object with json format
   * <pre>
   * [
   *  {
   *    name: 'list_name',
   *    id: 'list_id'
   *  },
   *  {
   *    ...
   *  }
   * ]
   * </pre>
   */
  getLists(board_id) {
    const url = `https://trello.com/1/boards/${board_id}/lists?key=${this.key}&token=${this.token}&fields=name`;
    return this.fetch(url);
  }

  /**
   * Get cards in specfic list.
   *
   * @param {String} list id
   * @return object with json format
   * <pre>
   * [
   *  {
   *    id: 'card_id',
   *    desc: 'card_desc',
   *    name: 'card_name',
   *    ... and more
   *  }
   * ]
   * </pre>
   */
  getCards(list_id) {
    const url = `https://trello.com/1/lists/${list_id}/cards?key=${this.key}&token=${this.token}`;
    return this.fetch(url);
  }

  /**
   * Get cards information text.
   *
   * @param {String} list id
   * @return text
   */
  getCardsText(list_id) {

    let attachments = [];
    const jsonData = this.getCards(list_id);

    for (let i = 0; i < jsonData.length; i++) {
      let data = jsonData[i];
      let name = data.name;
      let url = data.url;
      let desc = data.desc;

      const event = {
        "fallback": name,
        "color": "#0000ff",
        "title": name,
        "title_link": url,
        "text": desc
      };
      attachments.push(event);
    }
    if (attachments.length > 0) {
      return attachments;
    } else {
      return '$TRELLO_NOTASK';
    }
  }

  /**
   * Fetch url.
   *
   * @return response with json format
   */
  fetch(url) {
    const options = {
      'method': 'get',
      'contentType': 'application/json;charset=utf-8'
    };
    const response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText('UTF-8'));
  }
}

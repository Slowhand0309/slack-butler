import {Calendar} from './calendar'
import {Trello} from './trello'
import {Notify} from './notify'

export class Interactive {

  constructor(token, trigger = '') {
    this.token = token;
    this.notify = new Notify();
    this.trigger = trigger;
  }

  doResponse(e) {
    this.validation(e);
    const message = this.getMessage(e.parameter.text);
    this.exec(message);
  }

  exec(message) {
    let str = 'Unknown message.';
    if (/event/.test(message)) {
      const cal = new Calendar('$CALENDAR_ID');
      str = cal.getNotifyMessage();

    } else if (/task/.test(message)) {
      const trello = new Trello('$TRELLO_USER', '$TRELLO_KEY', '$TRELLO_TOKEN');
      str = trello.getCardsText('$TRELLO_LISTID');
    }
    this.notify.postSlack(str);
  }

  validation(e) {
    if (this.token != e.parameter.token) {
      throw new Error(`Token error: invalid token(${e.parameter.token})`);
    }
  }

  getMessage(text) {
    return text.replace(this.trigger, '').trim();
  }
}

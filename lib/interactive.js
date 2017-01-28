import {Translate} from './translate'
import {Calendar} from './calendar'
import {Weather} from './weather'
import {Trello} from './trello'
import {Recipe} from './recipe'
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
    let content;
    if (/^event/.test(message)) {
      const cal = new Calendar('$CALENDAR_ID');
      content = cal.getNotifyMessage();

    } else if (/^task/.test(message)) {
      const trello = new Trello('$TRELLO_USER', '$TRELLO_KEY', '$TRELLO_TOKEN');
      content = trello.getCardsText('$TRELLO_LISTID');

    } else if (/^tl@*/.test(message)) {
      const translate = new Translate();
      content = translate.parse(message);

    } else if (/^weather/.test(message)) {
      const weather = new Weather();
      content = weather.getWeatherReport('$WEATHER_CITYID');

    } else if (/^recipe/.test(message)) {
      const recipe = new Recipe();
      content = recipe.getRecipes('$RECIPE_APPID');

    } else {
      this.notify.postSlack('Unknown message.');
    }

    this.notify.postSlack(content);
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

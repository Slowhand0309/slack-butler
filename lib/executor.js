import {Calendar} from './calendar'
import {Weather} from './weather'
import {Trello} from './trello'
import {Notify} from './notify'

export class Executor {

  constructor() {

  }

  execute() {
    Logger.log('---- execute start ----');
    const notify = new Notify();
    notify.postSlack('$MORNING_MESSAGE');

    // Notify events for today.
    const cal = new Calendar('$CALENDAR_ID');
    const eventsMessage = cal.getNotifyMessage();
    notify.postSlack(eventsMessage);

    // Notify task for trello.
    const trello = new Trello('$TRELLO_USER', '$TRELLO_KEY', '$TRELLO_TOKEN');
    const tasks = trello.getCardsText('$TRELLO_LISTID');
    notify.postSlack(tasks);

    // Notify weather.
    const weather = new Weather();
    const report = weather.getWeatherReport('$WEATHER_CITYID');
    notify.postSlack(report);

    Logger.log('---- execute end ----');
  }
}

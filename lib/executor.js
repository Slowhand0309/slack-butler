import {Calendar} from './calendar'
import {Notify} from './notify'

export class Executor {

  constructor() {

  }

  execute() {
    Logger.log('---- execute start ----');
    const notify = new Notify();

    // Notify events for today.
    const cal = new Calendar('$CALENDAR_ID');
    const eventsMessage = cal.getNotifyMessage();
    notify.postSlack(eventsMessage);

    Logger.log('---- execute end ----');
  }
}

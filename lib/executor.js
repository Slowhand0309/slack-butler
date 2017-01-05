import {Calendar} from './calendar'

export class Executor {

  constructor() {

  }

  execute() {
    Logger.log('---- execute start ----');

    // Notify events for today.
    const cal = new Calendar('$CALENDAR_ID');
    const eventsMessage = cal.getNotifyMessage();
    Logger.log(`eventsMessage: ${eventsMessage}`);

    Logger.log('---- execute end ----');
  }
}

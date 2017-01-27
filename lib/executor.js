import {Calendar} from './calendar'
import {Weather} from './weather'
import {Trello} from './trello'
import {Recipe} from './recipe'
import {Notify} from './notify'

export class Executor {

  constructor() {

  }

  execute() {
    Logger.log('---- execute start ----');
    const notify = new Notify();
    notify.postSlack('$MORNING_MESSAGE');

    // Notify events for today.
    notify.postSlack('$EVENT_NOTIFY_TITLE');
    const cal = new Calendar('$CALENDAR_ID');
    const eventsMessage = cal.getNotifyMessage();
    notify.postSlack(eventsMessage);

    // Notify task for trello.
    notify.postSlack('$TRELLO_NOTIFY_TITLE');
    const trello = new Trello('$TRELLO_USER', '$TRELLO_KEY', '$TRELLO_TOKEN');
    const tasks = trello.getCardsText('$TRELLO_LISTID');
    notify.postSlack(tasks);

    // Notify weather.
    notify.postSlack('$WEATHER_TITLE');
    const weather = new Weather();
    const report = weather.getWeatherReport('$WEATHER_CITYID');
    notify.postSlack(report);

    // Notify recommended recipes.
    notify.postSlack('$RECIPE_TITLE');
    const recipe = new Recipe();
    const recipes = recipe.getRecipes('$RECIPE_APPID');
    notify.postSlack(recipes);

    Logger.log('---- execute end ----');
  }
}


export class Calendar {

  /**
   * Constructor
   *
   * @param {String} id calendar id
   */
  constructor(id) {
    this.id = id;
  }

  /**
   * Get calendar reference by id.
   *
   * @return {Calendar}
   */
  getCal() {
    return CalendarApp.getCalendarById(this.id);
  }

  /**
   * Get events for today.
   *
   * @return {Event}
   */
  getEventsForDay() {
    const calendar = this.getCal();
    return calendar.getEventsForDay(new Date());
  }

  /**
   * Format to 'HH:mm'
   *
   * @return {String}
   */
  toDateString(str) {
    return Utilities.formatDate(str, '$TIME_ZONE', 'HH:mm');
  }

  /**
   * Create message.
   */
  createMessage() {
    let str = "$EVENT_NOTIFY_TITLE";

    const events = this.getEventsForDay();
    for (let i = 0; i < events.length; i++) {
      let title = events[i].getTitle();
      let start = this.toDateString(events[i].getStartTime());
      let end = this.toDateString(events[i].getEndTime());
      str = `${str}\n${start}-${end} : ${title}`;
    }
    return str;
  }

  /**
   * Get notify message.
   *
   * @return {String} message
   */
  getNotifyMessage() {
    return this.createMessage();
  }
}

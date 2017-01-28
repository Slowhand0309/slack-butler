
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

    let attachments = [];
    const events = this.getEventsForDay();

    for (let i = 0; i < events.length; i++) {
      let title = events[i].getTitle();
      let start = this.toDateString(events[i].getStartTime());
      let end = this.toDateString(events[i].getEndTime());
      let desc = events[i].getDescription();

      const event = {
        "fallback": title,
        "color": "#36a64f",
        "title": title,
        "text": `${start}-${end}\n${desc}`
      };
      attachments.push(event);
    }
    return attachments;
  }

  /**
   * Get notify message.
   *
   * @return {String} message or {Array} attachments
   */
  getNotifyMessage() {
    const attachments = this.createMessage();
    if (attachments.length > 0) {
      return attachments;
    }
    return '$CALENDAR_NOEVENT';
  }
}

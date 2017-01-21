
export class Weather {

  constructor() {

  }

  /**
   * Get report of weather via http://weather.livedoor.com.
   * (Japanese area only...)
   *
   * Get city id by following url:
   * http://weather.livedoor.com/forecast/rss/primary_area.xml
   */
  getWeatherReport(city) {
    const url = `http://weather.livedoor.com/forecast/webservice/json/v1?city=${city}`;
    const data = this.fetch(url);

    let str = "$WEATHER_TITLE";
    str = `${str}\n${data["title"]}\n${data["link"]}\n${data["description"]["text"]}`;
    return str;
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

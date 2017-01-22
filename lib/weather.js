
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

    const attachments = [
      {
         "color": "#ffa500",
         "author_name": data["copyright"]["image"]["title"],
         "author_link": data["copyright"]["image"]["link"],
         "author_icon": data["copyright"]["image"]["url"],
         "title": data["title"],
         "title_link": data["link"],
         "text": data["description"]["text"],
         "fields": [
             {
                 "title": data["forecasts"][0]["telop"],
                 "value": data["forecasts"][0]["dateLabel"],
                 "short": false
             }
         ],
         "image_url": data["forecasts"][0]["image"]["url"]
      }
    ];
    //str = `${str}\n${data["title"]}\n${data["link"]}\n${data["description"]["text"]}`;
    return attachments;
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

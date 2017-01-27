
export class Recipe {

  constructor() {

  }

  /**
   * Get Recommended Recipes via http://recipe.rakuten.co.jp.
   *
   * @param {String} applicationId
   */
  getRecipes(id) {
    const url = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20121121?format=json&categoryId=30&applicationId=${id}`;
    const data = this.fetch(url);
    const recipes = data.result;

    let attachments = [];
    for (let i = 0; i < recipes.length; i++) {
      let elem = recipes[i];
      const recipe = {
        "color": "#ff0000",
        "title": elem.recipeTitle,
        "title_link": elem.recipeUrl,
        "text": elem.recipeDescription,
        "image_url": elem.mediumImageUrl
      };
      attachments.push(recipe);
    }
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

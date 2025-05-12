class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this._url = url
  }

  async getData() {
    return fetch(this._url)
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((err) => console.log('erreur', err))
  }
}

class RecipeApi extends Api {
  /**
   *
   * @param {string} url
   */

  constructor(url) {
    super(url)
  }

  async getDataRecipes() {
    const recipes = await this.getData()
    return recipes
  }
}

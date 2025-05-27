class SearchV2 {
  /**
   *
   * @param {array} Recipes
   * @param {string} search
   */

  constructor(List, search) {
    this._List = List
    this._search = search
  }

  async searchByInput() {
    if (!this._search) return this._List

    const searchTerm = this._search.toLowerCase()

    return this._List.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.appliance.toLowerCase().includes(searchTerm) ||
        recipe.ustensils.some((ustensil) =>
          ustensil.toLowerCase().includes(searchTerm),
        ) ||
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(searchTerm),
        ),
    )
  }

  async searchByItem() {
    if (!this._search) return this._List

    const searchTerm = this._search.toLowerCase()

    return this._List.filter((item) => item.toLowerCase().includes(searchTerm))
  }

  async searchByTag() {
    if (!Array.isArray(this._search) || this._search.length === 0)
      return this._List

    const searchTerms = this._search.map((term) => term.toLowerCase())

    return this._List.filter((recipe) =>
      searchTerms.every(
        (term) =>
          recipe.appliance.toLowerCase().includes(term) ||
          recipe.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(term),
          ) ||
          recipe.ingredients.some((ing) =>
            ing.ingredient.toLowerCase().includes(term),
          ),
      ),
    )
  }
}

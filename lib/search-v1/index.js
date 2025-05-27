class SearchV1 {
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
    if (!this._search) {
      return this._List
    }

    const FilteredRecipes = []

    for (let i = 0; i < this._List.length; i++) {
      if (
        this._List[i].appliance
          .toLowerCase()
          .includes(this._search.toLowerCase())
      ) {
        FilteredRecipes.push(this._List[i])
      } else if (
        this._List[i].name.toLowerCase().includes(this._search.toLowerCase())
      ) {
        FilteredRecipes.push(this._List[i])
      } else {
        for (let j = 0; j < this._List[i].ustensils.length; j++) {
          if (
            this._List[i].ustensils[j]
              .toLowerCase()
              .includes(this._search.toLowerCase())
          ) {
            FilteredRecipes.push(this._List[i])
          }
        }

        for (let j = 0; j < this._List[i].ingredients.length; j++) {
          if (
            this._List[i].ingredients[j].ingredient
              .toLowerCase()
              .includes(this._search.toLowerCase())
          ) {
            FilteredRecipes.push(this._List[i])
          }
        }
      }
    }
    return FilteredRecipes
  }

  async searchByItem() {
    if (!this._search) {
      return this._List
    }

    const FilteredItems = []

    for (let i = 0; i < this._List.length; i++) {
      if (this._List[i].includes(this._search.toLowerCase())) {
        FilteredItems.push(this._List[i])
      }
    }

    return FilteredItems
  }

  async searchByTag() {
    if (!this._search) {
      return this._List
    }

    let FilteredRecipes = []

    for (let i = 0; i < this._List.length; i++) {
      let recipe = this._List[i]
      let searchIndex = 0

      for (let j = 0; j < this._search.length; j++) {
        let termFound = false
        let searchTerm = this._search[searchIndex].toLowerCase()

        // Vérifier appliance
        if (recipe.appliance.toLowerCase().includes(searchTerm)) {
          termFound = true
        }

        // Vérifier ingrédients
        if (!termFound) {
          for (let k = 0; k < recipe.ingredients.length; k++) {
            if (
              recipe.ingredients[k].ingredient
                .toLowerCase()
                .includes(searchTerm)
            ) {
              termFound = true
              break
            }
          }
        }

        // Vérifier ustensiles
        if (!termFound) {
          for (let k = 0; k < recipe.ustensils.length; k++) {
            if (recipe.ustensils[k].toLowerCase().includes(searchTerm)) {
              termFound = true
              break
            }
          }
        }

        if (termFound) {
          searchIndex++
        } else {
          break
        }
      }

      if (searchIndex === this._search.length) {
        FilteredRecipes.push(recipe)
      }
    }

    return FilteredRecipes
  }
}

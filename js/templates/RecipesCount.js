class RecipesCount {
  constructor(recipes) {
    this._recipes = recipes
    this.$wrapper = document.querySelector('.recipes-count-wrapper')
  }

  render() {
    const total = this._recipes.length

    this.$wrapper.innerHTML = `
        <p class="recipes-count">${total} RECETTES</p>
    `
  }
}

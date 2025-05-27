class SearchForm {
  constructor(placeholder, Recipes) {
    this.placeholder = placeholder

    this.Recipes = Recipes

    this.$recipesWrapper = document.querySelector('.recipes-wrapper')
    this.resetBtn = null
    this.items = null
    this.list = null
  }

  async search(e) {
    if (e.target.value.length >= 3) {
      this.resetBtn.style.display = 'block'

      this.$recipesWrapper.innerHTML = ''

      const AdapterSearchLib = new SearchRecipesAdapter(
        this.Recipes,
        e.target.value,
      )

      const FilteredRecipes = await AdapterSearchLib.searchByInput()

      if (FilteredRecipes.length > 0) {
        FilteredRecipes.forEach((recipe) => {
          const reicpes = new Recipe(recipe)
          const Template = new RecipeCard(reicpes)
          this.$recipesWrapper.appendChild(Template.createRecipeCard())
        })
      } else {
        this.$recipesWrapper.innerHTML = `<p class="empty-recipes">Aucune recettes ne corresponds à la recherche</p>`
      }
      const Template = new RecipesCount(FilteredRecipes)
      Template.render()

      const dropdown = new DropdownFilter()
      dropdown.updateDropdown(FilteredRecipes)
    }
  }

  reset() {
    this.resetBtn.style.display = 'none'

    const FilteredRecipes = this.Recipes
    FilteredRecipes.forEach((recipe) => {
      const reicpes = new Recipe(recipe)
      const Template = new RecipeCard(reicpes)
      this.$recipesWrapper.appendChild(Template.createRecipeCard())
    })
    const Template = new RecipesCount(FilteredRecipes)
    Template.render()

    const dropdown = new DropdownFilter()
    dropdown.updateDropdown(FilteredRecipes)
  }

  createSearchForm() {
    // Créer les éléments DOM
    const searchForm = document.createElement('form')
    searchForm.setAttribute(
      'class',
      'col-8 rounded-3 search-form hero__search m-5',
    )

    const input = document.createElement('input')
    if (this.placeholder) {
      input.placeholder = this.placeholder
    }
    input.type = 'search'
    input.name = 'search'
    input.className = 'search-input'

    const searchBtn = document.createElement('button')
    searchBtn.setAttribute('class', 'rounded-3 p-2 search__button')

    const resetBtn = document.createElement('button')
    resetBtn.type = 'reset'
    resetBtn.textContent = 'x'
    resetBtn.className = 'reset-btn'

    this.resetBtn = resetBtn

    const searchIcon = document.createElement('i')
    searchIcon.className = 'fas fa-search'

    // Assembler les éléments
    searchBtn.appendChild(searchIcon)
    searchForm.appendChild(input)
    searchForm.appendChild(resetBtn)
    searchForm.appendChild(searchBtn)

    input.addEventListener('input', (e) => this.search(e))
    resetBtn.addEventListener('click', () => this.reset())

    return searchForm
  }
}

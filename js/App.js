class App {
  constructor() {
    this.$recipesWrapper = document.querySelector('.recipes-wrapper')
    this.$searchFormWrapper = document.querySelector('.search-form-wrapper')

    this.recipesApi = new RecipeApi('./data/recipes.json')

    this.FullRecipes = []
  }

  async fetchRecipes() {
    const recipesData = await this.recipesApi.getData()

    const Recipes = recipesData.map((recipe) => new Recipe(recipe))

    this.FullRecipes = Recipes
  }

  async renderSearchForm() {
    const Template = new SearchForm(
      'Rechercher une recette, un ingrédient, ...',
      'hero',
    )
    this.$searchFormWrapper.appendChild(Template.createSearchForm())
  }

  async renderRecipesCount() {
    const Template = new RecipesCount(this.FullRecipes)
    Template.render()
  }

  async renderDropdownFilter() {
    const uniqueIngredients = getUniqueValues(this.FullRecipes, (recipe) =>
      recipe.ingredients.map((ing) => ing.ingredient),
    )
    const uniqueAppliances = getUniqueValues(this.FullRecipes, (recipe) => [
      recipe.appliance,
    ])
    const uniqueUstensils = getUniqueValues(
      this.FullRecipes,
      (recipe) => recipe.ustensils,
    )

    const ingredientsDropdown = new DropdownFilter(
      'Ingrédients',
      uniqueIngredients,
    )
    const appliancesDropdown = new DropdownFilter('Appareils', uniqueAppliances)
    const ustensilsDropdown = new DropdownFilter('Ustensiles', uniqueUstensils)

    ingredientsDropdown.render()
    appliancesDropdown.render()
    ustensilsDropdown.render()
  }

  async init() {
    await this.fetchRecipes()
    await this.renderRecipesCount()
    await this.renderDropdownFilter()
    await this.renderSearchForm()

    this.FullRecipes.forEach((recipe) => {
      const Template = new RecipeCard(recipe)

      this.$recipesWrapper.appendChild(Template.createRecipeCard())
    })
  }

  main() {
    this.init()
  }
}

const app = new App()
app.main()

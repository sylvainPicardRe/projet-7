class App {
  constructor() {
    this.$recipesWrapper = document.querySelector('.recipes-wrapper')
    this.$searchFormWrapper = document.querySelector('.search-form-wrapper')

    this.recipesApi = new RecipeApi('./data/recipes.json')

    this.FullRecipes = []

    this.uniqueIngredients = null
    this.uniqueAppliances = null
    this.uniqueUstensils = null

    this.DropdownIngredients = null
    this.DropdownAppliances = null
    this.DropdownUstensils = null
  }

  async fetchRecipes() {
    const recipesData = await this.recipesApi.getData()

    const Recipes = recipesData.map((recipe) => new Recipe(recipe))

    this.FullRecipes = Recipes
  }

  async renderSearchForm() {
    const Template = new SearchForm(
      'Rechercher une recette, un ingrédient, ...',
      this.FullRecipes,
    )
    this.$searchFormWrapper.appendChild(Template.createSearchForm())
  }

  async renderRecipesCount() {
    const Template = new RecipesCount(this.FullRecipes)
    Template.render()
  }

  async renderDropdownFilter() {
    this.uniqueIngredients = getUniqueValues(this.FullRecipes, (recipe) =>
      recipe.ingredients.map((ing) => ing.ingredient),
    )

    this.uniqueAppliances = getUniqueValues(this.FullRecipes, (recipe) => [
      recipe.appliance,
    ])
    this.uniqueUstensils = getUniqueValues(
      this.FullRecipes,
      (recipe) => recipe.ustensils,
    )

    this.DropdownIngredients = new DropdownFilter(
      'Ingrédients',
      this.uniqueIngredients,
      this.FullRecipes,
    )
    this.DropdownAppliances = new DropdownFilter(
      'Appareils',
      this.uniqueAppliances,
      this.FullRecipes,
    )
    this.DropdownUstensils = new DropdownFilter(
      'Ustensiles',
      this.uniqueUstensils,
      this.FullRecipes,
    )

    this.DropdownIngredients.render()
    this.DropdownAppliances.render()
    this.DropdownUstensils.render()
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

const tagManager = new TagManager(app)

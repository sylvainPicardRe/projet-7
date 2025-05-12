class App {
  constructor() {
    this.$recipesWrapper = document.querySelector('.recipes-wrapper')
    console.log('toto')

    this.recipesApi = new RecipeApi('./data/recipes.json')

    this.FullRecipes = []
  }

  async fetchRecipes() {
    const recipesData = await this.recipesApi.getData()

    const Recipes = recipesData.map((recipe) => new Recipe(recipe))

    this.FullRecipes = Recipes
  }

  async init() {
    await this.fetchRecipes()

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

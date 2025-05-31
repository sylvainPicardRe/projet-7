class TagManager {
  constructor(app) {
    if (TagManager.instance) {
      return TagManager.instance
    }
    this.tags = []
    TagManager.instance = this

    this.app = app

    this.$tagsWrapper = document.querySelector('.tags-wrapper')
  }

  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag)
      this.createTag(tag)
    }
  }

  async removeTag(tag) {
    this.tags = this.tags.filter((t) => t !== tag)

    const AdapterSearchLib = new SearchRecipesAdapter(
      this.app.FullRecipes,
      this.getTags(),
    )
    const FilteredRecipes = await AdapterSearchLib.searchByTag()

    this.app.$recipesWrapper.innerHTML = ''

    FilteredRecipes.forEach((recipe) => {
      const Template = new RecipeCard(recipe)

      this.app.$recipesWrapper.appendChild(Template.createRecipeCard())
    })

    const Template = new RecipesCount(FilteredRecipes)
    Template.render()

    const dropdown = new DropdownFilter()
    dropdown.updateDropdown(FilteredRecipes)
  }

  getTags() {
    return this.tags
  }

  createTag(text) {
    const tag = new Tag(text).render()
    this.$tagsWrapper.appendChild(tag)
  }
}

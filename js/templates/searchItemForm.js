class SearchItemForm {
  constructor(type, Items, itemsListDiv, Recipes) {
    this.type = type
    this._Items = Items
    this.Recipes = Recipes

    this.$itemsListDiv = itemsListDiv
    this.$recipesWrapper = document.querySelector('.recipes-wrapper')
  }

  async search(e) {
    this.resetBtn.style.display = 'block'

    this.$itemsListDiv.innerHTML = ''

    const AdapterSearchLib = new SearchRecipesAdapter(
      this._Items,
      e.target.value,
    )

    const FilteredItems = await AdapterSearchLib.searchByItem()

    FilteredItems.forEach((item) => {
      const a = document.createElement('a')

      a.className = 'dropdown-item'
      a.href = '#'
      a.textContent = item
      this.$itemsListDiv.appendChild(a)
      a.addEventListener('click', async (e) => {
        e.preventDefault()
        //Création du tag
        const selectedText = e.target.textContent
        tagManager.createTag(selectedText)

        //   // Récupérer la liste actuelle des tags depuis le DOM
        const currentTags = this.getSelectedTags()

        const AdapterSearchLib = new SearchRecipesAdapter(
          this.Recipes,
          currentTags,
        )

        const FilteredRecipes = await AdapterSearchLib.searchByTag()

        if (FilteredRecipes.length > 0) {
          this.$recipesWrapper.innerHTML = ''
          FilteredRecipes.forEach((recipe) => {
            const reicpes = new Recipe(recipe)
            const Template = new RecipeCard(reicpes)
            this.$recipesWrapper.appendChild(Template.createRecipeCard())

            //Mise ajour du compteur de recette
            const TemplateCount = new RecipesCount(FilteredRecipes)
            TemplateCount.render()
          })
        }
      })
    })
  }

  getSelectedTags() {
    const tagsWrapper = document.querySelector('.tags-wrapper')
    const tagElements = tagsWrapper.querySelectorAll('.tag')
    const tags = Array.from(tagElements).map((tag) => tag.textContent.trim())
    return tags
  }

  reset() {
    this.resetBtn.style.display = 'none'
    this.$itemsListDiv.innerHTML = ''
    this._Items.forEach((item) => {
      const a = document.createElement('a')
      a.className = 'dropdown-item'
      a.href = '#'
      a.textContent = item
      a.addEventListener('click', (e) => {
        e.preventDefault()
        const tagsWrapper = document.querySelector('.tags-wrapper')
        const selectedText = e.target.textContent

        // // Vérifier si le tag existe déjà
        const existingTags = tagsWrapper.querySelectorAll('.tag')
        const isDuplicate = Array.from(existingTags).some(
          (tag) => tag.textContent.trim() === selectedText,
        )

        if (!isDuplicate) {
          const tag = new Tag(selectedText).render()
          tagsWrapper.appendChild(tag)
          //   menu.classList.remove('show')
        }
      })
      this.$itemsListDiv.appendChild(a)
    })
  }

  createSearchItemsForm() {
    const searchItemsForm = document.createElement('form')
    searchItemsForm.setAttribute(
      'class',
      'col-8 rounded-3 search-form dropdown-search',
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
    searchItemsForm.appendChild(input)
    searchItemsForm.appendChild(resetBtn)
    searchItemsForm.appendChild(searchBtn)

    input.addEventListener('input', (e) => this.search(e))
    resetBtn.addEventListener('click', () => this.reset())
    return searchItemsForm
  }
}

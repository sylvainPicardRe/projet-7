class DropdownFilter {
  constructor(type, items, Recipes) {
    this.type = type // 'Ingrédients', 'Appareils' ou 'Ustensiles'
    this.items = items // Tableau d'éléments uniques
    this.itemsListDiv = null
    this.Recipes = Recipes
    this.container = document.querySelector('.dropdown-filter-wrapper')
  }

  updateDropdown(Recipes) {
    this.container.innerHTML = ''
    const uniqueIngredients = getUniqueValues(Recipes, (recipe) =>
      recipe.ingredients.map((ing) => ing.ingredient),
    )

    const uniqueAppliances = getUniqueValues(Recipes, (recipe) => [
      recipe.appliance,
    ])
    const uniqueUstensils = getUniqueValues(
      Recipes,
      (recipe) => recipe.ustensils,
    )

    const DropdownIngredients = new DropdownFilter(
      'Ingrédients',
      uniqueIngredients,
      Recipes,
    )
    const DropdownAppliances = new DropdownFilter(
      'Appareils',
      uniqueAppliances,
      Recipes,
    )
    const DropdownUstensils = new DropdownFilter(
      'Ustensiles',
      uniqueUstensils,
      Recipes,
    )

    DropdownIngredients.render()
    DropdownAppliances.render()
    DropdownUstensils.render()
  }

  searchTag() {
    const recipesWrapper = document.querySelector('.recipes-wrapper')
    if (this.itemsListDiv != null) {
      this.itemsListDiv.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', async (e) => {
          recipesWrapper.innerHTML = ''

          const selectedText = e.target.textContent
          tagManager.addTag(selectedText)

          const AdapterSearchLib = new SearchRecipesAdapter(
            this.Recipes,
            tagManager.getTags(),
          )
          const FilteredRecipes = await AdapterSearchLib.searchByTag()

          FilteredRecipes.forEach((recipe) => {
            const Template = new RecipeCard(recipe)

            recipesWrapper.appendChild(Template.createRecipeCard())
          })

          const Template = new RecipesCount(FilteredRecipes)
          Template.render()

          //Mise a jour des dropdown
          this.updateDropdown(FilteredRecipes)
        })
      })
    }
  }

  render() {
    // Créer le conteneur du dropdown
    const dropdownDiv = document.createElement('div')
    dropdownDiv.setAttribute('class', `dropdown dropdown-${this.type}`)

    this.dropdown = dropdownDiv

    const arrowIcon = document.createElement('i')
    arrowIcon.setAttribute('class', 'fa fa-chevron-down')

    // Créer le bouton de déclenchement du dropdown
    const button = document.createElement('button')
    button.className = 'dropdown-button'
    button.type = 'button'
    button.textContent = this.type

    // Créer la liste déroulante
    const menu = document.createElement('div')
    menu.className = 'dropdown-menu'

    const listDiv = document.createElement('div')
    listDiv.className = 'dropdown-list'
    this.listDiv = listDiv

    this.items.forEach((item) => {
      const a = document.createElement('a')
      a.className = 'dropdown-item'
      a.href = '#'
      a.textContent = item
      a.addEventListener('click', (e) => {
        e.preventDefault()
        this.searchTag()
      })
      listDiv.appendChild(a)
      this.itemsListDiv = listDiv
    })

    const search = new SearchItemForm(
      this.type,
      this.items,
      this.itemsListDiv,
      this.Recipes,
    )

    menu.appendChild(search.createSearchItemsForm())

    // Gérer l'ouverture/fermeture du menu
    button.addEventListener('click', (e) => {
      e.stopPropagation()
      menu.classList.toggle('show')
    })

    // Assembler les éléments
    dropdownDiv.appendChild(button)
    button.appendChild(arrowIcon)
    menu.appendChild(this.listDiv)
    dropdownDiv.appendChild(menu)

    this.container.appendChild(dropdownDiv)
    this.dropdownDiv = dropdownDiv

    this.searchTag()
  }
}

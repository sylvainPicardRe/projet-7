class SearchForm {
  constructor(placeholder, parent) {
    this.placeholder = placeholder
    this.parent = parent
  }

  createSearchForm() {
    // Créer les éléments DOM
    const searchForm = document.createElement('form')
    searchForm.setAttribute(
      'class',
      `col-8 rounded-3 search-form ${this.parent == 'hero' ? 'hero__search m-5' : 'dropdown-search'}`,
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

    const searchIcon = document.createElement('i')
    searchIcon.className = 'fas fa-search'

    // Assembler les éléments
    searchBtn.appendChild(searchIcon)
    searchForm.appendChild(input)
    searchForm.appendChild(resetBtn)
    searchForm.appendChild(searchBtn)

    // Attacher l'événement
    // button.addEventListener('click', () => this.handleClose())
    // this.element = searchForm

    return searchForm
  }
}

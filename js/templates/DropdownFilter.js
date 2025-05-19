class DropdownFilter {
  constructor(type, items, containerSelector, onSelectCallback) {
    this.type = type // 'Ingrédients', 'Appareils' ou 'Ustensiles'
    this.items = items // Tableau d'éléments uniques
    this.container = document.querySelector('.dropdown-filter-wrapper')
  }
  render() {
    // Créer le conteneur du dropdown
    const dropdownDiv = document.createElement('div')
    dropdownDiv.className = 'dropdown'

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

    // Ajouter les éléments au dropdown
    this.items.forEach((item) => {
      const a = document.createElement('a')
      a.className = 'dropdown-item'
      a.href = '#'
      a.textContent = item
      a.addEventListener('click', (e) => {
        e.preventDefault()
        const tagsWrapper = document.querySelector('.tags-wrapper')
        const selectedText = e.target.textContent

        // Vérifier si le tag existe déjà
        const existingTags = tagsWrapper.querySelectorAll('.tag')
        const isDuplicate = Array.from(existingTags).some(
          (tag) => tag.textContent.trim() === selectedText,
        )

        if (!isDuplicate) {
          const tag = new Tag(selectedText).render()
          tagsWrapper.appendChild(tag)
          menu.classList.remove('show')
        }
      })
      menu.appendChild(a)
    })

    // Gérer l'ouverture/fermeture du menu
    button.addEventListener('click', (e) => {
      e.stopPropagation()
      menu.classList.toggle('show')
    })

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', () => {
      // menu.classList.remove('show')
    })

    // Assembler les éléments
    dropdownDiv.appendChild(button)
    button.appendChild(arrowIcon)
    dropdownDiv.appendChild(menu)
    this.container.appendChild(dropdownDiv)
  }
}

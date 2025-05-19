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
        // menu.classList.remove('show') // Fermer le menu après sélection
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
    dropdownDiv.appendChild(menu)
    this.container.appendChild(dropdownDiv)
  }
}

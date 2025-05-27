class Tag {
  constructor(name) {
    this.name = name
    this.element = null
  }
  handleClose() {
    this.element.remove()
    tagManager.removeTag(this.name)
  }
  render() {
    // Créer les éléments DOM
    const tagDiv = document.createElement('div')
    tagDiv.className = 'tag'

    const p = document.createElement('p')
    p.textContent = this.name

    const button = document.createElement('button')
    button.className = 'tag-btn'

    const icon = document.createElement('i')
    icon.className = 'fa-solid fa-xmark'

    // Assembler les éléments
    button.appendChild(icon)
    tagDiv.appendChild(p)
    tagDiv.appendChild(button)

    // Attacher l'événement
    button.addEventListener('click', () => this.handleClose())
    this.element = tagDiv

    return tagDiv
  }
}

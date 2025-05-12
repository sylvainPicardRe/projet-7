class Recipe {
  constructor(data) {
    this._id = data.id || null
    this._image = data.image || 'default-image.jpg'
    this._name = data.name || 'Nom non défini'
    this._servings = data.servings || 1
    this._ingredients = data.ingredients || []
    this._time = data.time || 0
    this._description = data.description || 'Pas de description'
    this._appliance = data.appliance || ''
    this._ustensils = data.ustensils || []
  }

  // Getters
  get id() {
    return this._id
  }

  get image() {
    return this._image
  }

  get imgPath() {
    return `./assets/${this._image}`
  }

  get name() {
    return this._name
  }

  get servings() {
    return this._servings
  }

  get ingredients() {
    return this._ingredients
  }

  get time() {
    return this._time
  }

  get description() {
    return this._description
  }

  get appliance() {
    return this._appliance
  }

  get ustensils() {
    return this._ustensils
  }
}

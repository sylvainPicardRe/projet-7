class SearchRecipesAdapter {
  constructor(List, search) {
    this.List = List
    this.search = search
  }

  async searchByInput() {
    const search = new SearchV2(this.List, this.search)
    return search.searchByInput()
  }

  async searchByItem() {
    const search = new SearchV2(this.List, this.search)
    return search.searchByItem()
  }

  async searchByTag() {
    const search = new SearchV2(this.List, this.search)
    return search.searchByTag()
  }
}

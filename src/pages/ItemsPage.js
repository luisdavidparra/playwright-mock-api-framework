class ItemsPage {
  constructor(page) {
    this.page = page;
    this.inputNewItem = page.locator("#newItem");
    this.addButton = page.locator("#addBtn");
    this.itemsList = page.locator("#items li");
  }

  async goto() {
    await this.page.goto("http://localhost:8080");
  }

  // CREATE
  async addItem(name) {
    await this.inputNewItem.fill(name);
    await this.addButton.click();
  }

  // READ
  async getItems() {
    return this.itemsList.allTextContents();
  }

  async itemExists(name) {
    const items = await this.getItems();
    return items.some((text) => text.includes(name));
  }
}

module.exports = { ItemsPage };

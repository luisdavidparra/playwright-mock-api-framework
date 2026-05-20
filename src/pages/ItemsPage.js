const selectors = require("../selectors/items.selectors");

class ItemsPage {
  constructor(page) {
    this.page = page;
    this.inputNewItem = page.locator(selectors.inputNewItem);
    this.addButton = page.locator(selectors.addButton);
    this.itemsListNames = page.locator(selectors.itemsListNames);
  }

  async goto() {
    await this.page.goto("http://localhost:8080");

    // Wait until the page finishes all network requests
    await this.page.waitForLoadState("networkidle");
  }

  // CREATE
  async addItem(name) {
    await this.inputNewItem.fill(name);

    const [response] = await Promise.all([
      this.page.waitForResponse(
        (res) => res.url().includes("/items") && res.request().method() === "POST",
      ),
      this.addButton.click(),
    ]);

    const createdItem = await response.json();

    return createdItem.id; // Return created item's ID for later use in test
  }

  async tryAddEmptyItem() {
    await this.inputNewItem.fill("");
    await this.addButton.click();
  }

  async tryAddWhitespaceItem() {
    await this.inputNewItem.fill("   ");
    await this.addButton.click();
  }

  // READ
  async getItemsName() {
    const spans = this.itemsListNames;

    if ((await spans.count()) === 0) return [];

    const count = await spans.count();
    const names = [];

    for (let i = 0; i < count; i++) {
      const text = await spans.nth(i).innerText();
      names.push(text.trim());
    }

    return names;
  }

  async itemExists(name) {
    const items = await this.getItemsName();
    return items.some((text) => text === name);
  }

  getItemRow(name) {
    return this.page.locator("#items li", { hasText: name });
  }

  getItemRowById(id) {
    return this.page.locator(selectors.itemRowById(id));
  }

  getItemNameSpanById(id) {
    return this.page.locator(selectors.itemNameSpanById(id));
  }

  getCheckboxById(id) {
    return this.page.locator(selectors.itemCheckboxById(id));
  }

  // UPDATE
  async editItem(newName, id) {
    const editBtn = this.page.locator(selectors.itemEditButtonById(id));
    await editBtn.click();

    const input = this.page.locator(selectors.itemInputById(id));
    await input.fill(newName);

    const saveBtn = this.page.locator(selectors.itemSaveButtonById(id));
    await saveBtn.click();
  }

  // DELETE
  async deleteItemById(id) {
    const deleteBtn = this.page.locator(selectors.itemDeleteButtonById(id));
    await deleteBtn.click();
  }

  // TOGGLE
  async toggleStatusById(id) {
    const checkbox = this.page.locator(selectors.itemCheckboxById(id));

    const [response] = await Promise.all([
      this.page.waitForResponse(
        (res) => res.url().includes(`/items/${id}`) && res.request().method() === "PUT",
      ),
      checkbox.click(),
    ]);
  }
}

module.exports = { ItemsPage };

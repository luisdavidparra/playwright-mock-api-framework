class ItemsPage {
  constructor(page) {
    this.page = page;
    this.inputNewItem = page.locator("#newItem");
    this.addButton = page.locator("#addBtn");
    this.itemsListName = page.locator("#items li span");
  }

  async goto() {
    await this.page.goto("http://localhost:8080");
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
    const spans = this.itemsListName;
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
    return this.page.locator(`[id="${id}"]`);
  }

  getItemNameSpanById(id) {
    return this.page.locator(`[id="${id}"] span`);
  }

  getCheckboxById(id) {
    return this.getItemRowById(id).locator(".toggleStatusChk");
  }

  // UPDATE
  async editItem(newName, id) {
    const row = this.getItemRowById(id);

    const editBtn = row.locator(".editBtn");
    await editBtn.click();

    const input = row.locator("input");
    await input.fill(newName);

    const saveBtn = row.locator(".saveBtn");
    await saveBtn.click();
  }

  // DELETE
  async deleteItemById(id) {
    const row = this.getItemRowById(id);
    const deleteBtn = row.locator(".deleteBtn");
    await deleteBtn.click();
  }

  // TOGGLE
  async toggleStatusById(id) {
    const row = this.getItemRowById(id);
    const checkbox = row.locator(".toggleStatusChk");

    checkbox.click();
  }
}

module.exports = { ItemsPage };

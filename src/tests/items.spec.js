const { test, expect } = require("@playwright/test");

test.describe("Items UI", () => {
  test("should add a new item", async ({ page }) => {
    await page.goto("http://localhost:8080");

    const newItemName = "Test New Item";
    const inputNewItem = page.locator("#newItem");
    await inputNewItem.fill(newItemName);

    const addButton = page.locator("#addBtn");
    await addButton.click();

    // Verify the new item was added to the list
    const itemList = page.locator("#items li");
    const allItems = await itemList.allTextContents();
    expect(allItems).toContain(newItemName);
  });
});

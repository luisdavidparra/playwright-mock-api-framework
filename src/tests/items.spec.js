const { test, expect } = require("@playwright/test");
const { ItemsPage } = require("../pages/ItemsPage");

test.describe("Items UI", () => {
  test("should add a new item", async ({ page }) => {
    const itemsPage = new ItemsPage(page);

    await itemsPage.goto();

    const newItemName = "Test New Item";
    await itemsPage.addItem(newItemName);

    expect(await itemsPage.itemExists(newItemName)).toBe(true);
  });
});

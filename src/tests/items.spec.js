const { test, expect } = require("@playwright/test");
const { ItemsPage } = require("../pages/ItemsPage");

test.describe("Items UI", () => {
  test("should add a new item", async ({ page }) => {
    const itemsPage = new ItemsPage(page);
    await itemsPage.goto();

    const random = Math.floor(Math.random() * 100000);
    const newItemName = `newItem${random}`;
    await itemsPage.addItem(newItemName);

    expect(await itemsPage.getItemRow(newItemName)).toBeVisible();
  });
});

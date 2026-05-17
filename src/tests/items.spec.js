const { test, expect } = require("@playwright/test");
const { ItemsPage } = require("../pages/ItemsPage");
const { getItemByName, deleteItemById } = require("../helpers/api");

test.describe("Items UI", () => {
  let newItemName;

  test.afterEach(async () => {
    if (!newItemName) return;

    const item = await getItemByName(newItemName);
    if (item) await deleteItemById(item.id);
  });

  test("should add a new item", async ({ page }) => {
    const itemsPage = new ItemsPage(page);
    await itemsPage.goto();

    const random = Math.floor(Math.random() * 100000);
    newItemName = `newItem${random}`;
    await itemsPage.addItem(newItemName);

    expect(await itemsPage.getItemRow(newItemName)).toBeVisible();
  });
});

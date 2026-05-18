const { test, expect } = require("@playwright/test");
const { ItemsPage } = require("../pages/ItemsPage");
const { getItemByName, deleteItemById } = require("../helpers/api");

test.describe("Items UI", () => {
  let createdItemId;

  test.afterEach(async () => {
    if (!createdItemId) return;

    if (createdItemId) await deleteItemById(createdItemId);
  });

  test("should add a new item", async ({ page }) => {
    const itemsPage = new ItemsPage(page);
    await itemsPage.goto();

    const random = Math.floor(Math.random() * 100000);
    const newItemName = `newItem${random}`;

    const itemId = await itemsPage.addItem(newItemName);
    createdItemId = itemId;

    await expect(itemsPage.getItemNameSpanById(itemId)).toHaveText(newItemName);
  });

  test("should edit an existing item", async ({ page }) => {
    const itemsPage = new ItemsPage(page);
    await itemsPage.goto();

    const random = Math.floor(Math.random() * 100000);
    const originalName = `itemToEdit${random}`;
    const updatedName = `updated_${originalName}`;

    const itemId = await itemsPage.addItem(originalName);
    createdItemId = itemId;

    await expect(itemsPage.getItemNameSpanById(itemId)).toHaveText(originalName);

    await itemsPage.editItem(updatedName, itemId);

    await expect(itemsPage.getItemNameSpanById(itemId)).toHaveText(updatedName);
    await expect(itemsPage.getItemNameSpanById(itemId)).not.toHaveText(originalName);
  });
});

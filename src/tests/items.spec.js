const { test, expect } = require("@playwright/test");
const { ItemsPage } = require("../pages/ItemsPage");
const { getAllItems, getItemById, deleteItemById } = require("../helpers/api");

test.describe("Items UI", () => {
  let createdItemId;
  let itemsPage;

  test.beforeEach(async ({ page }) => {
    itemsPage = new ItemsPage(page);
    await itemsPage.goto();

    // Wait until the page finishes all network requests
    await page.waitForLoadState("networkidle");
  });

  test.afterEach(async () => {
    if (createdItemId) {
      await deleteItemById(createdItemId).catch(() => {});
      createdItemId = undefined;
    }
  });

  test("should add a new item", async () => {
    const random = Math.floor(Math.random() * 100000);
    const newItemName = `newItem${random}`;

    const itemId = await itemsPage.addItem(newItemName);
    createdItemId = itemId;

    await expect(itemsPage.getItemNameSpanById(itemId)).toHaveText(newItemName);

    const backendItem = await getItemById(itemId);
    expect(backendItem.name).toBe(newItemName);
  });

  test("should edit an existing item", async () => {
    const random = Math.floor(Math.random() * 100000);
    const originalName = `itemToEdit${random}`;
    const updatedName = `updated_${originalName}`;

    const itemId = await itemsPage.addItem(originalName);
    createdItemId = itemId;

    await expect(itemsPage.getItemNameSpanById(itemId)).toHaveText(originalName);

    await itemsPage.editItem(updatedName, itemId);

    await expect(itemsPage.getItemNameSpanById(itemId)).toHaveText(updatedName);
    await expect(itemsPage.getItemNameSpanById(itemId)).not.toHaveText(originalName);

    const backendItem = await getItemById(itemId);
    expect(backendItem.name).toBe(updatedName);
  });

  test("should delete an existing item", async () => {
    const random = Math.floor(Math.random() * 100000);
    const newItemName = `itemToDelete${random}`;

    const itemId = await itemsPage.addItem(newItemName);
    createdItemId = itemId;

    await expect(itemsPage.getItemNameSpanById(itemId)).toHaveText(newItemName);

    await itemsPage.deleteItemById(itemId);

    await expect(itemsPage.getItemRowById(itemId)).not.toBeVisible();

    const backendItem = await getItemById(itemId);
    expect(backendItem).toBeUndefined();
  });

  test("should toggle item status between active and inactive", async () => {
    const random = Math.floor(Math.random() * 100000);
    const itemName = `toggleItem${random}`;

    const itemId = await itemsPage.addItem(itemName);
    createdItemId = itemId;

    const checkbox = itemsPage.getCheckboxById(itemId);

    // NewItems starts with active status
    await expect(checkbox).toBeChecked();

    let backendItem = await getItemById(itemId);
    expect(backendItem.status).toBe("active");

    // Toggle to inactive status
    await itemsPage.toggleStatusById(itemId);
    await expect(checkbox).not.toBeChecked();

    backendItem = await getItemById(itemId);
    expect(backendItem.status).toBe("inactive");

    // Toggle back to active status
    await itemsPage.toggleStatusById(itemId);
    await expect(checkbox).toBeChecked();

    backendItem = await getItemById(itemId);
    expect(backendItem.status).toBe("active");
  });

  test("should not add an item when input is empty", async () => {
    const initialUIItems = (await itemsPage.getItemsName()).length;
    const initialAPIItems = (await getAllItems()).length;

    await itemsPage.tryAddEmptyItem();

    const finalUIItems = (await itemsPage.getItemsName()).length;
    const finalAPIItems = (await getAllItems()).length;

    expect(initialUIItems).toBe(finalUIItems);
    expect(initialAPIItems).toBe(finalAPIItems);

    const names = await itemsPage.getItemsName();
    expect(names).not.toContain("");
  });

  test("should not add an item when input is whitespace", async () => {
    const initialUIItems = (await itemsPage.getItemsName()).length;
    const initialAPIItems = (await getAllItems()).length;

    await itemsPage.tryAddWhitespaceItem();

    const finalUIItems = (await itemsPage.getItemsName()).length;
    const finalAPIItems = (await getAllItems()).length;

    expect(initialUIItems).toBe(finalUIItems);
    expect(initialAPIItems).toBe(finalAPIItems);

    const names = await itemsPage.getItemsName();
    expect(names).not.toContain("");
  });
});

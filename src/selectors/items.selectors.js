module.exports = {
  inputNewItem: "#newItem",
  addButton: "#addBtn",
  itemsList: "#items li",
  itemsListNames: "#items li span",

  itemRowById: (id) => `[id="${id}"]`,
  itemNameSpanById: (id) => `[id="${id}"] span`,

  itemInputById: (id) => `[id="${id}"] input`,
  itemEditButtonById: (id) => `[id="${id}"] .editBtn`,
  itemSaveButtonById: (id) => `[id="${id}"] .saveBtn`,
  itemDeleteButtonById: (id) => `[id="${id}"] .deleteBtn`,
  itemCheckboxById: (id) => `[id="${id}"] .toggleStatusChk`,
};

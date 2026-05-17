const API_URL = "http://localhost:3000/items";

async function getItemByName(name) {
  const res = await fetch(API_URL);
  const items = await res.json();
  return items.find((i) => i.name === name);
}

async function deleteItemById(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

module.exports = { getItemByName, deleteItemById };

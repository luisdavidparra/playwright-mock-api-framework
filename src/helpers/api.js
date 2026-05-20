const API_URL = "http://localhost:3000/items";

async function getItemById(id) {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) return undefined;

  return res.json();
}

async function getAllItems() {
  const res = await fetch(`${API_URL}`);

  if (!res.ok) return undefined;

  return res.json();
}

async function deleteItemById(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

module.exports = { getItemById, getAllItems, deleteItemById };

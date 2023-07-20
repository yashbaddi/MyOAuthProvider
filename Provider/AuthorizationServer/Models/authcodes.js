import client from "./db-connection.js";

export async function readCodeDB(id) {
  const data = await client.get("code:" + id);
  return JSON.parse(data);
}

export async function createCodeDB(id, data) {
  const data = await client.set("code:" + id, JSON.stringify(data));
  console.log("createDB data", data);
}

export async function updateCodeDB(id, data) {
  const data = await client.set("code:" + id, JSON.stringify(data));
  console.log("createDB data", data);
}

export async function deleteCodeDB(id) {
  const data = await client.del("code:" + id);
  console.log(data);
}

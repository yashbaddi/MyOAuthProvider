import client from "./db-connection.js";

export async function readClientDB(id) {
  const data = await client.get("client:" + id);
  return JSON.parse(data);
}

export async function createClientDB(id, data) {
  const data = await client.set("client:" + id, JSON.stringify(data));
  console.log("createDB data", data);
}

export async function updateClientDB(id, data) {
  const data = await client.set("client:" + id, JSON.stringify(data));
  console.log("createDB data", data);
}

export async function deleteClientDB(id) {
  const data = await client.del("client:" + id);
  console.log(data);
}

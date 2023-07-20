import client from "./db-connection.js";

async function readClientDB(id) {
  const data = await client.get("client:" + id);
  return JSON.parse(data);
}

async function createClientDB(id, data) {
  const data = await client.set("client:" + id, JSON.stringify(data));
  console.log("createDB data", data);
}

async function updateClientDB(id, data) {
  const data = await client.set("client:" + id, JSON.stringify(data));
  console.log("createDB data", data);
}

async function deleteClientDB(id) {
  const data = await client.del("client:" + id);
  console.log(data);
}

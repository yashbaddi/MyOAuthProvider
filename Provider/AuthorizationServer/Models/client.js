import client from "./db-connection.js";

async function readDB(id) {
  const data = await client.get("client:" + id);
  return JSON.parse(data);
}

async function createDB(id, data) {
  const data = await client.set("client:" + id, JSON.stringify(data));
  console.log("createDB data", data);
}

async function updateDB(id, data) {
  const data = await client.set("client:" + id, JSON.stringify(data));
  console.log("createDB data", data);
}

async function deleteDB(id) {
  const data = await client.del("client:" + id);
  console.log(data);
}

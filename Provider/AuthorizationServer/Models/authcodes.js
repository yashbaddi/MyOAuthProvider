import client from "./db-connection.js";

async function readCodeDB(id) {
  const data = await client.get("code:" + id);
  return JSON.parse(data);
}

async function createCodeDB(id, data) {
  const data = await client.set("code:" + id, JSON.stringify(data));
  console.log("createDB data", data);
}

async function updateCodeDB(id, data) {
  const data = await client.set("code:" + id, JSON.stringify(data));
  console.log("createDB data", data);
}

async function deleteCodeDB(id) {
  const data = await client.del("code:" + id);
  console.log(data);
}

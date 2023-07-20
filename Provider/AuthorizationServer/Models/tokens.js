import client from "./db-connection.js";

async function readTokenDB(id) {
  const data = await client.get("tokens:" + id);
  return JSON.parse(data);
}

async function createTokenDB(id, data) {
  const data = await client.set("tokens:" + id, JSON.stringify(data));
  console.log("createDB data", data);
}

async function updateTokenDB(id, data) {
  const data = await client.set("tokens:" + id, JSON.stringify(data));
  console.log("createDB data", data);
}

async function deleteTokenDB(id) {
  const data = await client.del("tokens:" + id);
  console.log(data);
}

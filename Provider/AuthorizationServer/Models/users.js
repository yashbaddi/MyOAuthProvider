import client from "./db-connection.js";

async function readUserDB(id) {
  const data = await client.get("users:" + id);
  return JSON.parse(data);
}

async function createUserDB(id, data) {
  const data = await client.set("users:" + id, JSON.stringify(data));
  console.log("createDB data", data);
}

async function updateUserDB(id, data) {
  const data = await client.set("users:" + id, JSON.stringify(data));
  console.log("createDB data", data);
}

async function deleteUserDB(id) {
  const data = await client.del("usersUser:" + id);
  console.log(data);
}

import client from "./db-connection.js";

export async function readUserDB(id) {
  const data = await client.get("users:" + id);
  return JSON.parse(data);
}

export async function createUserDB(id, data) {
  const data = await client.set("users:" + id, JSON.stringify(data));
  console.log("createDB data", data);
}

export async function updateUserDB(id, data) {
  const data = await client.set("users:" + id, JSON.stringify(data));
  console.log("createDB data", data);
}

export async function deleteUserDB(id) {
  const data = await client.del("usersUser:" + id);
  console.log(data);
}

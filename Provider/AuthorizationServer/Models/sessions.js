import client from "./db-connection.js";

async function readSessionDB(id) {
  const data = await client.get("sessions:" + id);
  return JSON.parse(data);
}
Session;

async function createSessionDB(id, data) {
  const data = await client.set("sessions:" + id, JSON.stringify(data));
  console.log("createDB data", data);
}

async function updateSessionDB(id, data) {
  const data = await client.set("sessions:" + id, JSON.stringify(data));
  console.log("createDB data", data);
}

async function deleteSessionDB(id) {
  const data = await client.del("sessions:" + id);
  console.log(data);
}

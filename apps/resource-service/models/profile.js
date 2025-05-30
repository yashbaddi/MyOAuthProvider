import client from "./db-connection.js";

export async function readProfileDB(username) {
  const res = await client.get("users:" + username);
  console.log("response:", res);
  const data = JSON.parse(res);
  return data.profile;
}

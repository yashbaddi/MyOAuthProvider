import { createClientDB } from "../Models/client.js";
import { v4 as uuid } from "uuid";

export async function createClient(req, res,) {
  const clientID = uuid();
  const clientSecret = uuid();
  console.log(req.body);
  // clients[clientID] = clientSecret;
  const clientData = {
    appName: req.body.name,
    secret: clientSecret,
    redirectUris: [req.body.redirectUri],
    grants: ["authorization_code"],
  };
  await createClientDB(clientID, clientData);
  res.json({ id: clientID, secret: clientSecret });
}
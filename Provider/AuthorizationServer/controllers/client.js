import { createClientDB } from "../Models/client.js";
import { v4 as uuid } from "uuid";

export async function createClient(req, res, next) {
  const clientID = uuid();
  const clientSecret = uuid();
  // clients[clientID] = clientSecret;
  const clientData = {
    secret: clientSecret,
    redirectUris: [req.body.redirectUri],
    grants: ["authorization_code"],
  };
  await createClientDB(clientID, clientData);
  res.json({ id: clientID, secret: clientSecret });
}

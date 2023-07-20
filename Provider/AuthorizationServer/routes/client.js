import express from "express";
import { v4 as uuid } from "uuid";
import { createClientDB } from "../Models/client";

export const clients = {
  "f8f7b90f-5371-425f-a675-233926229578": {
    secret: "950bc64f-9740-4198-9a83-383f4729371c",
    redirectUris: ["http://localhost:3000/"],
    grants: ["authorization_code"],
  }, //Test Client
};

const clientRouter = express.Router();

clientRouter.post("/register", (req, res, next) => {
  const clientID = uuid();
  const clientSecret = uuid();
  // clients[clientID] = clientSecret;
  const clientData = {
    secret: clientSecret,
    redirectUris: [req.body.redirectUri],
    grants: ["authorization_code"],
  };
  createClientDB(clientID, clientData);
  res.json({ id: clientID, secret: clientSecret });
});

export default clientRouter;

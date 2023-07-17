import express from "express";
import { v4 as uuid } from "uuid";

export const clients = {
  "f8f7b90f-5371-425f-a675-233926229578": {
    clientSecret: "950bc64f-9740-4198-9a83-383f4729371c",
    redirectUris: ["http://localhost:3000/"],
    grants: ["code"],
  }, //Test Client
};

const clientRouter = express.Router();

clientRouter.post("/register", (req, res, next) => {
  const clientID = uuid();
  const clientSecret = uuid();
  clients[clientID] = clientSecret;
  res.json({ id: clientID, secret: clientSecret });
});

export default clientRouter;

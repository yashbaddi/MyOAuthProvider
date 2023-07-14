import express from "express";
import { v4 as uuid } from "uuid";

export const clients = {};

const clientRouter = express.Router();

clientRouter.post("/register", (req, res, next) => {
  const clientID = uuid();
  const clientSecret = uuid();
  clients[clientID] = clientSecret;
  res.json({ id: clientID, secret: clientSecret });
});

export default clientRouter;

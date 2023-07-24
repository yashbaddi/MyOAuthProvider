import { v4 as uuid } from "uuid";
import { sessionsDBZ } from "../model/session.js";

export async function createSession(req, res, next) {
  const user = sessionsDBZ[req.cookies.sessionID];
  if (user) {
    if (user.password == req.body.password) {
      const sessionID = uuid();
      sessionsDBZ[sessionID] = req.body.username;

      res.cookie("username", req.body.username);
      res.cookie("sessionID", sessionID);
      res.status(201).json({ message: "Login Sucess" });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
}

export async function deleteSession(req, res, next) {
  delete sessionsDBZ[req.cookies.sessionID];
  res.clearCookie("sessionID");
  res.clearCookie("username");

  res.sendStatus(200);
}

export async function authorizeSession(req, res, next) {
  res.send({ data: "Logged In" });
}

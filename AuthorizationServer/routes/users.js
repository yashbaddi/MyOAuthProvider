import express from "express";
import OAuth2Server from "oauth2-server";
import { v4 as uuid } from "uuid";

const usersRouter = express.Router();

export const users = {};
export const sessions = {};

usersRouter.post("/signup", (req, res) => {
  users[req.body.username] = {
    password: req.body.password,
    data: req.body.data,
  };
  console.log("USERS AFTER SIGNUP", users);
  res.sendStatus(201);
});

usersRouter.post("/login", (req, res) => {
  if (users[req.body.username]) {
    if (users[req.body.username].password === req.body.password) {
      const sessionID = uuid();
      sessions[sessionID] = req.body.username;
      console.log("session after login", sessions);
      res.cookie("username", req.body.username);
      res.cookie("sessionID", sessionID);
      res.status(201).json({ message: "Login Sucess" });
    } else {
      res.status(401).json({ message: "Incorrect Password" });
    }
  } else {
    res.status(401).json({ message: "Invalid Username" });
  }
});

usersRouter.post("/logout", (req, res, next) => {
  sessions[req.cookies.sessionID] = undefined;
  res.clearCookie("sessionID");
  res.clearCookie("username");

  res.sendStatus(200);
});

usersRouter.get("/", authMiddleware, (req, res) => {
  res.send({ data: users[req.cookies.username].data });
});

usersRouter.listen(8000);

export default usersRouter;

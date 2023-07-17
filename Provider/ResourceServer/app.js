import express from "express";
import express from "express";
import { users } from "../AuthorizationServer/routes/users.js";
import { verifyToken } from "./verifyTokenMiddleware.js";

const app = express();

app.get("/user/:id", verifyToken, (req, res, next) => {
  const userId = req.params.id;
  res.json({
    profile: users[userId].profile,
  });
});

app.listen(3001);

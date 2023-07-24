import express from "express";
import { verifyToken } from "./verifyTokenMiddleware.js";
import { readProfile } from "./models/readProfile.js";

const app = express();

app.get("/profile/", verifyToken, async (req, res, next) => {
  const token = req.headers["x-access-token"];
  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );
  console.log(payload);
  res.json({
    profile: await readProfile(payload.sub.id),
  });
});

app.listen(3001);

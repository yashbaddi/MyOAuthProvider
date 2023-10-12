import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import axios from "axios";
import fetch from "node-fetch";

import { v4 as uuid } from "uuid";

const app = express();

const clientId = "";
const clientSecret = "";

function authMiddleware(req, res, next) {
  console.log(req.cookies);
  if (
    req.cookies.sessionID &&
    sessions[req.cookies.sessionID] === req.cookies.username
  ) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

const users = {};
const sessions = {};

app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type", "x-access-token"], // you can change the headers
    exposedHeaders: ["authorization", "x-access-token"], // you can change the headers
    origin: "http://127.0.0.1:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/callback", async (req, res, next) => {
  const authCode = req.query.code;

  const authorizationUri = "http://localhost:4000";
  const accessTokenRequestBody = {
    client_id: clientId,
    client_secret: clientSecret,
    code: authCode,
    grant_type: "code",
  };

  const enocodedString = new URLSearchParams(accessTokenRequestBody).toString();

  const res = await fetch(authorizationUri + "/oauth/token", {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: enocodedString,
  });

  const resourceServerURI = "localhost:3001";

  const resource = fetch(resourceServerURI + "/profile", {
    method: "GET",
    headers: {
      "x-access-token": res.accessToken,
    },
  });
  console.log(resource);
});

app.get("/", authMiddleware, (req, res) => {
  res.send({ data: users[req.cookies.username].data });
});

app.listen(3002);

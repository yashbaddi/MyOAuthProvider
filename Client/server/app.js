import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import axios from "axios";
import { v4 as uuid } from "uuid";

const app = express();

const clientSecret = "";
const clientId = "";

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
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "http://127.0.0.1:4500",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
  })
);

app.use(express.json());
app.use(cookieParser());

// app.post("/signup", (req, res) => {
//   users[req.body.username] = {
//     password: req.body.password,
//     data: req.body.data,
//   };
//   console.log("USERS AFTER SIGNUP", users);
//   res.sendStatus(201);
// });

app.post("/login", (req, res) => {
  const redirectUri = "http://localhost:3002/callback";
  const scope = "profile";

  const authorizationUri = `http://localhost:3000/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

  res.redirect(authorizationUri);

  // if (users[req.body.username]) {
  //   if (users[req.body.username].password === req.body.password) {
  //     const sessionID = uuid();
  //     sessions[sessionID] = req.body.username;
  //     console.log("session after login", sessions);
  //     res.cookie("username", req.body.username);
  //     res.cookie("sessionID", sessionID);
  //     res.status(201).json({ message: "loginSucess" });
  //   } else {
  //     res.status(401).json({ message: "Incorrect Password" });
  //   }
  // } else {
  //   res.status(401).json({ message: "Invalid Username" });
  // }
});

app.get("/callback", async (req, res, next) => {
  const authCode = req.body.code;

  const authorizationUri = "localhost:3000";
  const accessTokenQuery = {
    client_id: clientId,
    client_secret: clientSecret,
    code: authCode,
    grant_type: "code",
  };
  const queryString = new URLSearchParams(accessTokenQuery).toString();

  const tokens = await axios.get(
    `${authorizationUri}/oauth/token?${queryString}`
  );
  const resourceServerURI = "localhost:3001";
  const resourceQuery = {
    access_token: tokens.access_token,
  };

  const resourceQueryString = new URLSearchParams(resourceQuery).toString();

  const responseData = await axios.get();
});

app.post("/logout", (req, res) => {
  sessions[req.cookies.sessionID] = undefined;
  res.clearCookie("sessionID");
  res.clearCookie("username");

  res.sendStatus(200);
});

app.get("/", authMiddleware, (req, res) => {
  res.send({ data: users[req.cookies.username].data });
});

app.listen(3002);

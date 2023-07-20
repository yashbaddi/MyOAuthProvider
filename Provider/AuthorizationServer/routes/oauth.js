import express from "express";
import OAuth2Server from "oauth2-server";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

import oauthModel from "../oauth-model.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const oauthRouter = express.Router();
oauthRouter.use(express.urlencoded());

const authCodes = {};
const tokens = {};

let authRequest, authResponse;

const oauth = new OAuth2Server({
  model: oauthModel,
  grants: ["authorization_code"],
});

oauthRouter.get("/authorize", async (req, res, next) => {
  authRequest = new OAuth2Server.Request(req);
  authResponse = new OAuth2Server.Response(res);

  res.redirect("http://localhost:3000/oauth/consent");
});

oauthRouter.post("/token", async (req, res, next) => {
  try {
    const tokenRequest = new OAuth2Server.Request(req);
    const tokenResponse = new OAuth2Server.Response(res);

    const token = await oauth.token(tokenRequest, tokenResponse);
    console.log("In token", token);

    res.json(token);
  } catch (e) {
    next(e);
  }
});

oauthRouter.use("/consent", (req, res, next) => {
  console.log("enter consent");
  express.static(path.join(__dirname, "../views/UserConsentScr"))(
    req,
    res,
    next
  );
});

oauthRouter.post("/approve", async (req, res) => {
  try {
    const options = {
      authenticateHandler: {
        handle: (data) => {
          return { id: data };
        },
      },
    };
    const result = await oauth.authorize(authRequest, authResponse, options);
    console.log("authorization Result", result);

    if (result.authorizationCode) {
      const redirectUri = `${result.redirectUri}?code=${result.authorizationCode}`;
      res.redirect(redirectUri);
    } else {
      res.status(authResponse.status).send(authResponse.body);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

oauthRouter.post("/denied", (req, res) => {
  res.status(403).send("Request Denied");
});

export default oauthRouter;

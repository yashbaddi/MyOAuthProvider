import express from "express";
import OAuth2Server from "oauth2-server";
import { v4 as uuid } from "uuid";
import { users } from "./users.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { clients } from "./client.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { privateKey } from "../../config.js";
import jsonwebtoken from "jsonwebtoken";

const __dirname = dirname(fileURLToPath(import.meta.url));

const oauthRouter = express.Router();

const authorizationCodes = {};
let authRequest, authResponse;

const oauth = new OAuth2Server({
  model: {
    getClient: async (clientId, clientSecret) => {
      if (clients[clientId] == clientSecret) {
        return clients[clientId];
      }
      return false;
    },

    generateAuthorizationCode: async (client, user, scope) => {
      return uuid();
    },
    generateAccessToken: async (client, user, scope) => {
      payload = {
        client: client,
        user: user,
        scope: scope,
      };
      return jsonwebtoken.sign(payload, privateKey);
    },
    // generateRefreshToken: async (client, user, scope) => {},
    getAuthorizationCode: async (authorizationCode) => {
      authorizationCodes[authorizationCode];
      return authorizationCode;
    },
    saveAuthorizationCode: async (code, client, user) => {
      authorizationCodes[code] = {
        client: client,
        user: user,
      };
    },
    // saveToken: async (token, client, user) => {},
    // revokeAuthorizationCode: async (code) => {},
    // validateScope: async () => {},
  },
});

oauthRouter.get("/authorize", isAuthenticated, async (req, res, next) => {
  authRequest = new OAuth2Server.Request(req);
  authResponse = new OAuth2Server.Response(res);

  res.redirect("http://localhost:3000/oauth/consent");
});

oauthRouter.post("/token", (req, res, next) => {
  try {
    const tokenRequest = new OAuth2Server.Request(req);
    const tokenResponse = new OAuth2Server.Response(res);

    const token = oauth.token(tokenRequest, tokenResponse);

    res.json(token);
  } catch (e) {
    next(e);
  }
});

oauthRouter.use(
  "/consent",
  express.static(path.join(__dirname, "../Frontend"))
);

oauthRouter.post("/approved", async (req, res) => {
  try {
    const result = await oauth.authorize(authRequest, authResponse);

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

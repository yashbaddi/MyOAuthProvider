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

const authCodes = {};
const tokens = {};

let authRequest, authResponse;

const oauth = new OAuth2Server({
  model: {
    getClient: async (clientId, clientSecret) => {
      const client = clients[clientId];
      return {
        id: clientId,
        clientSecret: client.secret,
        redirectUris: client.redirectUris,
        grants: client.grants,
      };
    },

    generateAccessToken: async (client, user, scope) => {
      payload = {
        client: client,
        user: user,
        scope: scope,
      };
      return jsonwebtoken.sign(payload, privateKey);
    },

    getAuthorizationCode: async (code) => {
      const savedCode = authCodes[code];

      return {
        code: code,
        redirectUri: savedCode.redirectUri,
        client: savedCode.client,
        user: savedCode.user,
      };
    },

    saveAuthorizationCode: async (code, client, user) => {
      authCodes[code] = {
        code: code,
        redirectUri: client.redirectUris,
        client: client,
        user: user,
      };
      return code;
    },

    getAccessToken(token) {
      return {
        accessToken: token,
      };
    },
    saveToken: async (token, client, user) => {
      return token;
    },
    revokeAuthorizationCode: async (code) => {
      if (authCodes[code] !== undefined) {
        authCodes[code] = undefined;
        return true;
      }
      return false;
    },
    // validateScope: async () => {},
  },
  grants: ["authorization_code"],
});

oauthRouter.get("/authorize", async (req, res, next) => {
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

oauthRouter.use("/consent", (req, res, next) => {
  console.log("enter consent");
  express.static(path.join(__dirname, "../Frontend/UserConsentScr"))(
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

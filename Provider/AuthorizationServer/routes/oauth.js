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
oauthRouter.use(express.urlencoded());

const authCodes = {};
const tokens = {};

let authRequest, authResponse;

const oauth = new OAuth2Server({
  model: {
    getClient: async (clientId, clientSecret) => {
      console.log("clients", clients, "id:", clientId, "secret:", clientSecret);
      const client = clients[clientId];
      return {
        id: clientId,
        clientSecret: clientSecret,
        redirectUris: client.redirectUris,
        grants: client.grants,
      };
    },
    getUser: async (username) => {
      return {};
    },
    generateAccessToken: async (client, user, scope) => {
      const payload = {
        iss: "MyOAuthProvider",
        sub: { user: "123" },
        exp: Date.now() + 1000000,
        iat: Date.now(),
        aud: client,
        scope: scope,
      };
      console.log(payload);
      return jsonwebtoken.sign(payload, privateKey);
    },

    getAuthorizationCode: async (authCode) => {
      const savedCode = authCodes[authCode];
      return {
        code: authCode,
        expiresAt: savedCode.expiresAt,
        redirectUri: savedCode.redirectUri,
        scope: savedCode.scope,
        client: savedCode.client,
        user: savedCode.user,
      };
    },

    saveAuthorizationCode: async (code, client, user) => {
      authCodes[code.authorizationCode] = {
        expiresAt: code.expiresAt,
        redirectUri: code.redirectUri,
        scope: code.scope,
        client: client,
        user: user,
      };
      return code;
    },

    getAccessToken(accessToken) {
      const tokenInfo = tokens[accessToken];
      console.log("tokenInfo", tokenInfo);
      return tokenInfo;
    },
    saveToken: async (token, client, user) => {
      tokens[token.accessToken] = {
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        scope: token.scope,
        client: client,
        user: user,
      };
      console.log("in save token", tokens[token.accessToken]);
      return tokens[token.accessToken];
    },
    revokeAuthorizationCode: async (code) => {
      if (authCodes[code.code] !== undefined) {
        authCodes[code.code] = undefined;
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

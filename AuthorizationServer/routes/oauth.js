import express from "express";
import OAuth2Server from "oauth2-server";
import { v4 as uuid } from "uuid";
import { users } from "./users.js";
import { clients } from "./client.js";
import { isAuthenticated } from "../middlewares/auth.js";

const oauthRouter = express.Router();

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
    generateAccessToken: async (client, user, scope) => {},
    generateRefreshToken: async (client, user, scope) => {},
    getAuthorizationCode: async (authorizationCode) => {
      return authorizationCode;
    },
    saveAuthorizationCode: async (code, client, user) => {},
    saveToken: async (token, client, user) => {},
    revokeAuthorizationCode: async (code) => {},
    validateScope: async () => {},
  },
});

oauthRouter.get("/authorize", isAuthenticated, (req, res, next) => {
  try {
    const request = new OAuth2Server.Request(req);
    const response = new OAuth2Server.Response(res);

    const result = oauth.authorize(request, response);
    if (result.authorizationCode) {
      const redirectUri = `${result.redirectUri}?code=${result.authorizationCode}`;

      res.redirect(redirectUri);
    } else {
      res.status(response.status).send(response.body);
    }
  } catch (e) {
    next(e);
  }
});

oauthRouter.post("/token", (req, res, next) => {
  try {
    const request = new OAuth2Server.Request(req);
    const response = new OAuth2Server.Response(res);

    const token = oauth.token(request, response);

    res.json(token);
  } catch (e) {
    next(e);
  }
});

export default oauthRouter;
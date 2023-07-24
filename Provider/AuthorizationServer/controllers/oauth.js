import express from "express";

import oauthModel from "../oauth-model.js";
import OAuth2Server from "oauth2-server";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

let authRequest, authResponse;

const __dirname = dirname(fileURLToPath(import.meta.url));

const oauth = new OAuth2Server({
  model: oauthModel,
  grants: ["authorization_code"],
  accessTokenLifetime: 60 * 60 * 24, // 24 hours, or 1 day
  allowEmptyState: true,
  allowExtendedTokenAttributes: true,
});

export async function authorizeHandler(req, res, next) {
  authRequest = new OAuth2Server.Request(req);
  authResponse = new OAuth2Server.Response(res);

  res.redirect("http://localhost:3000/oauth/consent");
}

export async function consentHandler(req, res, next) {
  console.log("enter consent");
  express.static(path.join(__dirname, "../views"))(req, res, next);
}

export async function approveHandler(req, res, next) {
  try {
    const options = {
      authenticateHandler: {
        handle: (data) => {
          return { id: data.cookies.username };
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
}

export async function denyHandler(req, res, next) {
  res.status(403).send("Request Denied");
}

export async function tokenHandler(req, res, next) {
  try {
    const tokenRequest = new OAuth2Server.Request(req);
    const tokenResponse = new OAuth2Server.Response(res);
    console.log("pretoken");

    const token = await oauth.token(tokenRequest, tokenResponse);
    console.log("In token", token);

    res.json(token);
  } catch (e) {
    next(e);
  }
}

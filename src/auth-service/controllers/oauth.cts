// Renamed to TypeScript
import express from "express";
import querystring from "querystring";
import { Request, Response, NextFunction } from "express";
import oauthModel from "../oauth-model.js";
import OAuth2Server from "oauth2-server";
import { dirname } from "path";
import { fileURLToPath } from "url";

const path = require("path");
const __dirname = path.resolve();
// let authRequest, authResponse;

const oauth = new OAuth2Server({
  model: oauthModel,
  // grants: ["authorization_code"],
  accessTokenLifetime: 60 * 60 * 24, // 24 hours, or 1 day
  allowEmptyState: true,
  allowExtendedTokenAttributes: true,
});

export async function authorizeHandler(req: Request, res: Response, next: NextFunction) {
  // authRequest = new OAuth2Server.Request(req);
  // authResponse = new OAuth2Server.Response(res);

  // res.cookie("x-auth-query", JSON.stringify(req.query));
  // res.cookies("x-auth-response", JSON.stringify(authResponse));
  res.redirect(
    "http://localhost:4000/oauth/consent?" + querystring.stringify(req.query as Record<string, string>)

  );
}

export async function consentHandler(req: Request, res: Response, next: NextFunction) {
  console.log("enter consent");
  express.static(path.join(__dirname, "../views"))(req, res, next);
}

export async function approveHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const options = {
      authenticateHandler: {
        handle: (data:any) => {
          return { id: data.cookies.username };
        },
      },
    };
    // console.log("ifd", req.cookies);
    // req.query = JSON.parse(req.cookies["x-auth-query"]);

    const authRequest = new OAuth2Server.Request(req);
    const authResponse = new OAuth2Server.Response(res);
    // // const authResponse = JSON.parse(req.cookies["x-auth-response"]);
    // res.clearCookie("x-auth-query");
    // res.clearCookie("x-auth-response");

    const result = await oauth.authorize(authRequest, authResponse, options);
    console.log("authorization Result", result);

    if (result.authorizationCode) {
      const redirectUri = `${result.redirectUri}?code=${result.authorizationCode}`;
      res.redirect(redirectUri);
    } else {
      res.status(authResponse.status ?? 200).send(authResponse.body);

    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function denyHandler(req: Request, res: Response, next: NextFunction) {
  res.status(403).send("Request Denied");
}

export async function tokenHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenRequest = new OAuth2Server.Request(req);
    const tokenResponse = new OAuth2Server.Response(res);
    console.log("pretoken Request Body", req.body);

    const token = await oauth.token(tokenRequest, tokenResponse);
    console.log("In token", token);

    res.json(token);
  } catch (e) {
    next(e);
  }
}

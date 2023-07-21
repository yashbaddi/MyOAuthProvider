//A model part of the oauth2-server
import { clients } from "./client.js";
import { privateKey } from "../../config.js";
import jsonwebtoken from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { users } from "./users.js";
import { readClientDB } from "./Models/client.js";
import { createCodeDB, deleteCodeDB, readCodeDB } from "./Models/authcodes.js";
import { createTokenDB, readTokenDB } from "./Models/tokens.js";

export default oauthModel = {
  getClient: async (clientId, clientSecret) => {
    console.log("clients", clients, "id:", clientId, "secret:", clientSecret);
    const client = await readClientDB(clientId);
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

  saveAuthorizationCode: async (code, client, user) => {
    await createCodeDB(code.authorizationCode, {
      expiresAt: code.expiresAt,
      redirectUri: code.redirectUri,
      scope: code.scope,
      client: client,
      user: user,
    });
    return code;
  },

  revokeAuthorizationCode: async (code) => {
    if ((await readCodeDB(code.code)) !== undefined) {
      await deleteCodeDB(code.code);
      return true;
    }
    return false;
  },

  getAuthorizationCode: async (authCode) => {
    const savedCode = await readCodeDB(authCode);
    return {
      code: authCode,
      expiresAt: savedCode.expiresAt,
      redirectUri: savedCode.redirectUri,
      scope: savedCode.scope,
      client: savedCode.client,
      user: savedCode.user,
    };
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

  saveToken: async (token, client, user) => {
    await createTokenDB(token.accessToken, {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      scope: token.scope,
      client: client,
      user: user,
    });

    console.log("in save token", await readTokenDB(token.accessToken));
    return await readTokenDB(token.accessToken);
  },

  getAccessToken: async (accessToken) => {
    const tokenInfo = await readTokenDB(accessToken);
    console.log("tokenInfo", tokenInfo);
    return tokenInfo;
  },

  // validateScope: async () => {},
};

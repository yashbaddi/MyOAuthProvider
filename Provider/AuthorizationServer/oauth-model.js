//A model part of the oauth2-server
export default oauthModel = {
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
};

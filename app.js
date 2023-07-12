import express from "express";
import OAuth2Server from "oauth2-server";

const app = express();

//Dummy users
const users = {
  alice: {
    id: "123456789",
    username: "alice",
    password: "password123",
  },
};

const clients = {
  client_id: "client_secret",
};

const oauth = new OAuth2Server({
  model: {
    getClient: async (clientId, clientSecret) => {
      if (clients[clientId] == clientSecret) {
        return clients[clientId];
      }
      return false;
    },
    getUser: async (username, password) => {
      if (users[username]) {
        const user = users[username];
        if (user.password == password) {
          return { id: user.id };
        }
      }
    },
    saveAuthorizationCode: async () => {},
    saveToken: async () => {},
  },
});

app.get("/ouath/authorize", (req, res, next) => {
  try {
    const request = new OAuth2Server.Request(req);
    const response = new OAuth2Server.Response(res);

    const result = oauth.authorize(request, response);
    if (result.authorizationCode) {
      res.json(result);
    } else {
      res.status(response.status).send(response.body);
    }
  } catch (e) {
    next(e);
  }
});

app.post("/oauth/token", (req, res, next) => {
  try {
    const request = new OAuth2Server.Request(req);
    const response = new OAuth2Server.Response(res);

    const token = oauth.token(request, response);
    if (token.authorizationCode) {
      res.json(token);
    } else {
      res.status(response.status).send(response.body);
    }
  } catch (e) {
    next(e);
  }
});

app.listen(4000);

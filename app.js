import express from "express";
import OAuth2Server from "oauth2-server";

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
  },
});

const app = express();

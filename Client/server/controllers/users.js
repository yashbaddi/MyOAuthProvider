import { createUserDB } from "../Models/users.js";
import { usersDBZ } from "../model/users.js";

export async function createUser(req, res, next) {
  usersDBZ[req.body.username] = {
    password: req.body.password,
  };
}

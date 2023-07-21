import { createUserDB } from "../Models/users.js";

export async function createUser(req, res, next) {
  await createUserDB(req.body.username, {
    password: req.body.password,
    profile: {
      name: req.body.name,
      email: req.body.email,
      data: req.body.data,
    },
  });
  res.sendStatus(201);
}

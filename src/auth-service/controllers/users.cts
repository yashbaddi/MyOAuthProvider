// Renamed to TypeScript
import { createUserDB } from "../Models/users.js";
import { Request, Response, NextFunction } from "express";
export async function createUser(req: Request, res: Response, next: NextFunction) {
  await createUserDB(req.body.username, {
    password: req.body.password,
    profile: {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      data: req.body.data,
    },
  });
  res.sendStatus(201);
}

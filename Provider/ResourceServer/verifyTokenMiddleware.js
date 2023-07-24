import jsonwebtoken from "jsonwebtoken";
import { privateKey } from "../config.js";

export function verifyToken(req, res, next) {
  try {
    jsonwebtoken.verify(req.headers["x-access-token"], privateKey);
    next();
  } catch (e) {
    res.sendStatus(401);
  }
}

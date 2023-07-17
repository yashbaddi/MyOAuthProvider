import jsonwebtoken from "jsonwebtoken";
import { privateKey } from "../config";

export function verifyToken(req, res, next) {
  try {
    jsonwebtoken.verify(req.headers["access-token"], privateKey);
    next();
  } catch (e) {
    res.sendStatus(401);
  }
}

import { sessionsDBZ } from "../model/session.js";

export function isAuthenticated(req, res, next) {
  if (
    req.cookies.sessionID &&
    sessionsDBZ[req.cookies.sessionID] === req.cookies.username
  ) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

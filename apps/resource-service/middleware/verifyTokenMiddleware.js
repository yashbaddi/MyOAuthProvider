import jsonwebtoken from 'jsonwebtoken';
import config from '../../config.js';

export function verifyToken(req, res, next) {
  try {
    jsonwebtoken.verify(req.headers['x-access-token'], config.jwtPrivateKey);
    next();
  } catch (e) {
    res.sendStatus(401);
  }
}

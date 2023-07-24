import express from "express";

import {
  approveHandler,
  authorizeHandler,
  consentHandler,
  denyHandler,
  tokenHandler,
} from "../controllers/oauth.js";

const oauthRouter = express.Router();
oauthRouter.use(express.urlencoded());

oauthRouter.get("/authorize", authorizeHandler);

oauthRouter.post("/token", tokenHandler);

oauthRouter.use("/consent", consentHandler);

oauthRouter.post("/approve", approveHandler);

oauthRouter.post("/denied", denyHandler);

export default oauthRouter;

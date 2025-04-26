import express from "express";
import cors from "cors";
import { verifyToken } from "./verifyTokenMiddleware.js";
import { readProfile } from "./services/profile.js";
import profileRouter from "./routes/profile.js";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/profile/",profileRouter);

app.listen(4001);

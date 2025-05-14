// Renamed to TypeScript
import express from "express";
import cookieParser from "cookie-parser";
import oauthRouter from "./routes/oauth.cts";
import clientRouter from "./routes/client.cts";
import usersRouter from "./routes/users.cts"
import sessionRouter from "./routes/session.cts";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use("/client", clientRouter);
app.use("/oauth", oauthRouter);
app.use("/session", sessionRouter);
app.use("/users", usersRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.code || 500).json(err);
});

app.listen(4000);

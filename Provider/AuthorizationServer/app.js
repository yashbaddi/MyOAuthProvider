import express from "express";
import oauthRouter from "./routes/oauth";
import clientRouter from "./routes/client";
import usersRouter from "./routes/users";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/client", clientRouter);
app.use("/user", usersRouter);
app.use("/oauth", oauthRouter);

app.use((err, req, res, next) => {
  res.status(err.code || 500).json(err);
});

app.listen(3000);

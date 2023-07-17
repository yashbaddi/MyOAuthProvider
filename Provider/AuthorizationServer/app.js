import express from "express";
import cookieParser from "cookie-parser";
import oauthRouter from "./routes/oauth.js";
import clientRouter from "./routes/client.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/client", clientRouter);
app.use("/users", usersRouter);
app.use("/oauth", oauthRouter);
app.get("/", (req, res) => {
  res.send("hey");
});

app.use((err, req, res, next) => {
  res.status(err.code || 500).json(err);
});

app.listen(3000);

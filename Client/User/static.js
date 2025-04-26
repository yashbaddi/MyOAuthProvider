import express from "express";

const app = express();

app.use(express.static("../User"));

app.listen(3003);

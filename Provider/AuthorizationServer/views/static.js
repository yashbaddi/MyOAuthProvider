import express from "express";

const app = express();

app.use(express.static("views"));

app.listen(4500);

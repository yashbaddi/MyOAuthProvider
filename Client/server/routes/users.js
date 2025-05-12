import express from "express";
import { createUser } from "../controllers/users.cts";

const usersRouter = express.Router();

usersRouter.post("/", createUser);

export default usersRouter;

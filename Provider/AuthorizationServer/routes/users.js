import express from "express";
import { createUser } from "../controllers/users.js";

const usersRouter = express.Router();

export const users = {
  yashbaddi: {
    password: "12345",
    profile: {
      name: "Yash Baddi",
      email: "yashbaddi29@gmail.com",
      data: "Hey this is the secret data",
    },
  }, //Test user
};
export const sessions = {};

usersRouter.post("/", createUser);

export default usersRouter;

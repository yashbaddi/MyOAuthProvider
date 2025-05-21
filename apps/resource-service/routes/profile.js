import express from "express";
import { readProfile } from "../controllers/profile.js";

const profileRouter = express.Router();

profileRouter.get('/',readProfile);

export default profileRouter;
import express from "express";
import { createClient } from "../controllers/client.cts";

const clientRouter = express.Router();

clientRouter.post("/", createClient);

export default clientRouter;

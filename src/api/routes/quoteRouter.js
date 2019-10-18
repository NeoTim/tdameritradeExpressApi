import { Router } from "express";
import { getRange } from "../controllers/quoteController";

const quoteRouter = Router();

quoteRouter.get("/daily", getRange);

export default quoteRouter;

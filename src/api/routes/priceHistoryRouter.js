import { Router } from "express";
import { yearsWithDaily } from "../controllers/priceHistoryController";

const priceHistoryRouter = Router();

priceHistoryRouter.get("/yearsByDay", yearsWithDaily);

export default priceHistoryRouter;

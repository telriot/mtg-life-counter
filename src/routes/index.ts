import express, { Response, Request } from "express";
import { asyncErrorHandler } from "../middleware/index";
const router = express.Router();

/* GET home page. */
router.get("/", async (req: Request, res: Response, next) => {
  res.status(200).send({ response: "I am alive" });
});

export { router as indexRouter };

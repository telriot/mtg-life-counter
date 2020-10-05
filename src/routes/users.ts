import express, { Response, Request } from "express";
import { asyncErrorHandler } from "../middleware/index";
import { Room } from "../models/Room";
import { User } from "../models/User";
const router = express.Router();

/* GET home page. */

router.post(
  "/",
  asyncErrorHandler,
  async (req: Request, res: Response, next) => {
    const user = await User.findOne({ name: req.body.username });
    if (!user) {
      const userObj = { username: req.body.username };
      await User.create(userObj);
      res.status(200).send("User succesfully created");
    } else {
      res.status(401).send("Username already taken");
    }
  }
);
router.delete(
  "/:id",
  asyncErrorHandler,
  async (req: Request, res: Response, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send("No user to delete");
    } else {
      res.status(200).send("Username succesfully deleted");
    }
  }
);

export { router as usersRouter };

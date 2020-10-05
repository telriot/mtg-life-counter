import express, { Response, Request } from "express";
import { asyncErrorHandler } from "../middleware/index";
import { Room } from "../models/Room";
import { User } from "../models/User";
const router = express.Router();

router.put(
  "/:id",
  asyncErrorHandler,
  async (req: Request, res: Response, next) => {
    const room = await Room.findOne({ name: req.params.id });
    if (!room) {
      res.status(404).send("No room to join");
      return;
    }
    const { user } = req.body;
    if (room.users.includes(user)) {
      //handle user removal
    }

    await room.users.push(user);
    await room.save();
    res.status(200).send("No room to join");
  }
),
  router.delete(
    "/:id",
    asyncErrorHandler,
    async (req: Request, res: Response, next) => {
      const room = await Room.findByIdAndDelete(req.params.id);
      if (!room) {
        res.status(404).send("No room to delete");
      } else {
        res.status(200).send("Room succesfully deleted");
      }
    }
  );
export { router as roomsRouter };

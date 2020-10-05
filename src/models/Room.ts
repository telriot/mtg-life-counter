import mongoose from "mongoose";

const Schema = mongoose.Schema;
export interface IRoom extends mongoose.Document {
  name: string;
  users: Array<{ type: string }>;
  password: string;
}
const RoomSchema = new Schema({
  name: String,
  password: String,
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const Room = mongoose.model<IRoom>("Room", RoomSchema);

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
});

export const User = mongoose.model("User", UserSchema);

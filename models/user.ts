import { Schema, model } from "mongoose";

type UserType = {
  name: string;
  age: number;
  username: string;
  hash: string;
};

const UserSchema = new Schema<UserType>({
  name: String,
  age: Number,
  username: { unique: true, type: String },
  hash: String,
});

const User = model<UserType>("user", UserSchema);

export default User;

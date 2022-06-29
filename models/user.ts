import { Schema, model } from "mongoose";

type UserType = {
  name: string;
  age: number;
  username: string;
  password: string;
};

const UserSchema = new Schema<UserType>({
  name: String,
  age: Number,
  username: String,
  password: String,
});

const User = model<UserType>("user", UserSchema);

export default User;

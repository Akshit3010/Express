import { Schema, model } from "mongoose";

type roleType = {
  type: string;
  enum: string[];
};

type UserType = {
  name: string;
  age: number;
  username: string;
  hash: string;
  role: roleType;
};

const UserSchema = new Schema<UserType>({
  name: String,
  age: Number,
  username: { unique: true, type: String },
  hash: String,
  role: {
    type: String,
    enum: ["Admin", "Writer", "Reader"],
  },
});

const User = model<UserType>("user", UserSchema);

export default User;

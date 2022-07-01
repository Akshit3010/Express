import UserModel from "../models/user";
import * as argon2 from "argon2"
import jwt from "jsonwebtoken";


const signup= async () => {
    const hash = await argon2.hash("pass",{
        salt:Buffer.from("1234556"),
    }).catch(console.error)
  });

  const signin=async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    const verification = await argon2.verify(user?.hash,password)
    if (!verification) {
      return res.send("Invalid credentials");
    }
  
    //Generate a unique token
    const token = jwt.sign({ name: user?.name, age: user?.age,role:user?.role }, "SECRET1234", {
      expiresIn: "1d",
    });
    res.send({ message: "Sign in success", token });
  });
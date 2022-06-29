//@ts-check
import express from "express";
import db from "../db/db";
import UserModel from "../models/user";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/signup", (req, res) => {
  const { username, password, age, name } = req.body;
  const user = new UserModel({ username, password, age, name });
  user.save().then(() => {
    res.send({ message: "user created successfully" });
  });
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  //check hash.Check if they are same

  //Generate a unique token
  const token = jwt.sign({ name: user?.name, age: user?.age }, "SECRET1234", {
    expiresIn: "1d",
  });
  res.send({ message: "Sign in success", token });
});

app.get("/profile/:id", async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  const token = req.headers["authorization"]?.split(" ")[1] || "";

  if (!token) {
    return res.status(403).send("forbidden");
  }

  try {
    const decoded = jwt.verify(token, "SECRET1234");
    console.log(decoded);
    if (decoded) {
      res.send(user);
    }
    return res.status(403).send("Forbidden");
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.log(error.message);
      return res.status(403).send("Forbidden");
    }
  }
});

app.listen(8080, () => {
  db.then((conn) => {
    console.log("server started on http://localhost:8080/");
  });
});

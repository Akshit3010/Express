//@ts-check
import express from "express";
import db from "../db/db";
import UserModel from "../models/user";
import jwt from "jsonwebtoken";
import session from "express-session";
import crypto from "node:crypto";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);

app.post("/signup", (req, res) => {
  const { username, password, age, name } = req.body;
  const hash = crypto
    .pbkdf2Sync(password, "SECRETSALT1234", 60, 64, "sha256")
    .toString("hex");
  const user = new UserModel({ username, hash, age, name });
  user.save().then(() => {
    res.send({ message: "user created successfully", user });
  });
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  //check hash.Check if they are same
  const hash = crypto
    .pbkdf2Sync(password, "SECRETSALT1234", 60, 64, "sha256")
    .toString("hex");
  if (hash !== user?.hash) {
    return res.send("Invalid credentials");
  }

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

app.get("/", (req, res) => {
  console.log(req.session);
  // if (req.session.views) {
  //   req.session.views++;
  //   res.setHeader("Content-Type", "text/html");
  //   res.write("<p>views: " + req.session.views + "</p>");
  //   // res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
  //   res.end();
  // } else {
  //   req.session.views = 1;
  //   res.end("welcome to the session demo. refresh!");
  // }
  return res
    .cookie("auth", "12345", { httpOnly: true, secure: false })
    .send("Cookie Set");
});

app.listen(8080, () => {
  db.then((conn) => {
    console.log("server started on http://localhost:8080/");
  });
});

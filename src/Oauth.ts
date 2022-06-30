import express from "express";
const dotenv = require("dotenv");
import axios from "axios";

const app = express();

dotenv.config({ path: "./config.env" });

const CLIENTID = process.env.CLIENTID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/github/callback", async (req, res) => {
  const req_token = req.query.code; //used to get access token
  //Access token are different for every user
  //Store access token into db
  console.log("Login success", req.query);
  if (req.query.error) {
    res.send("Error occurred" + req.query.error_description);
  }
  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {},
    {
      params: {
        client_id: CLIENTID,
        client_secret: CLIENT_SECRET,
        code: req_token,
      },
    }
  );
  //store in db
  const accessToken = response.data.access_token;
  res.send("Login success");
});

app.get("/", (req, res) => {
  res.send(
    `<a href='https://github.com/login/oauth/authorize?client_id=${CLIENTID}'>Login with Github</a>`
  );
});

app.listen(8080, () => {
  console.log("server started on http://localhost:8080/");
});

import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);
const io = new Server(server);

const history: Array<string | number> = [];

io.on("connection", (ws) => {
  ws.emit("history", history);
  //send event to everyone except for current socket
  ws.broadcast.emit("newUser");
  console.log("Got new connection");
  ws.on("newMessage", (msg) => {
    console.log("Message recieved ", msg);
    history.push(msg);
    //broadcast
    io.emit("newMessage", msg);
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use("/", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

server.listen(8080, () => {
  console.log("Listening on port 8080");
});

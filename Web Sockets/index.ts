import express from "express";
import http from "http";
import ws, { WebSocketServer } from "ws";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/login", (req, res) => {
  res.send("User logged in");
});

const server = http.createServer(app);
server.listen(8000);

const wss = new WebSocketServer({
  // port: 9000,
  // host: "localhost",
  server: server,
});

wss.on("listening", () => {
  console.log("Listening for socket connection");
});

wss.on("connection", (socket) => {
  socket.send("Welcome User");

  socket.on("open", () => {
    console.log("socket opened");
  });

  socket.on("message", (msg) => {
    console.log("Client sent message", msg.toString("utf-8"));
    socket.send("Hello from server");
  });

  socket.on("close", (x) => {
    console.log("socket closed");
  });
});

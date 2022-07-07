"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const history = [];
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
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// app.use("/", express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
server.listen(8080, () => {
    console.log("Listening on port 8080");
});

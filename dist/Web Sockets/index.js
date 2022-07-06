"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.get("/login", (req, res) => {
    res.send("User logged in");
});
const server = http_1.default.createServer(app);
server.listen(8000);
const wss = new ws_1.WebSocketServer({
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

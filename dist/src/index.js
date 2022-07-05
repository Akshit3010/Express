"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-check
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db/db"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_session_1 = __importDefault(require("express-session"));
const node_crypto_1 = __importDefault(require("node:crypto"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}));
app.post("/signup", (req, res) => {
    const { username, password, age, name, role } = req.body;
    const hash = node_crypto_1.default
        .pbkdf2Sync(password, "SECRETSALT1234", 60, 64, "sha256")
        .toString("hex");
    const user = new user_1.default({ username, hash, age, name, role });
    user.save().then(() => {
        res.send({ message: "user created successfully", user });
    });
});
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_1.default.findOne({ username });
    //check hash.Check if they are same
    const hash = node_crypto_1.default
        .pbkdf2Sync(password, "SECRETSALT1234", 60, 64, "sha256")
        .toString("hex");
    if (hash !== (user === null || user === void 0 ? void 0 : user.hash)) {
        return res.send("Invalid credentials");
    }
    //Generate a unique token
    const token = jsonwebtoken_1.default.sign({ role: user === null || user === void 0 ? void 0 : user.role, id: user === null || user === void 0 ? void 0 : user._id }, "SECRET1234", {
        expiresIn: "1d",
    });
    res.send({ message: "Sign in success", token });
}));
app.get("/profile/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_1.default.findById(req.params.id);
    const token = ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "";
    if (!token) {
        return res.status(403).send("forbidden");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "SECRET1234");
        console.log(decoded);
        if (decoded) {
            res.send(user);
        }
        return res.status(403).send("Forbidden");
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            console.log(error.message);
            return res.status(403).send("Forbidden");
        }
    }
}));
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
    db_1.default.then((conn) => {
        console.log("server started on http://localhost:8080/");
    });
});

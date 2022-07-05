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
const express_1 = __importDefault(require("express"));
const dotenv = require("dotenv");
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
dotenv.config({ path: "./config.env" });
const CLIENTID = process.env.CLIENTID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get("/github/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const req_token = req.query.code; //used to get access token
    //Access token are different for every user
    //Store access token into db
    console.log("Login success", req.query);
    if (req.query.error) {
        res.send("Error occurred" + req.query.error_description);
    }
    const response = yield axios_1.default.post("https://github.com/login/oauth/access_token", {}, {
        params: {
            client_id: CLIENTID,
            client_secret: CLIENT_SECRET,
            code: req_token,
        },
    });
    //store in db
    const accessToken = response.data.access_token;
    res.send("Login success");
}));
app.get("/", (req, res) => {
    res.send(`<a href='https://github.com/login/oauth/authorize?client_id=${CLIENTID}'>Login with Github</a>`);
});
app.listen(8080, () => {
    console.log("server started on http://localhost:8080/");
});

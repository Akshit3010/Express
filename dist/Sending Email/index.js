"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlebars_1 = __importDefault(require("handlebars"));
const nodemailer_1 = __importDefault(require("nodemailer"));
//Transport
const transport = nodemailer_1.default.createTransport({
    host: "smpt.ethereal.email",
    secure: false,
    port: 587,
    auth: {
        user: "maximilian.trantow89@ethereal.email",
        pass: "Nx8JCp1qwuFMvu7eqY",
    },
});
//read file from template engine : email.js
const content = `
<div>
<h1>Hello,{{name}}</h1>
<p>Thanks, for signing in.</p>
</div>
`;
//template engines
const template = handlebars_1.default.compile(content);
transport
    .sendMail({
    from: "from@example.com",
    to: "t0@example.com",
    subject: "Hello from nodemailer",
    text: "Hello world nodemailer is back in action",
    html: template({ name: "SomeName" }),
})
    .then(console.log)
    .catch(console.error);

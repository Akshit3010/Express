import hbs from "handlebars";
import nodemailer from "nodemailer";

//Transport
const transport = nodemailer.createTransport({
  host: "smpt.ethereal.email",
  secure: false,
  port: 587, //465 : SSL , 587 : TLS
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
const template = hbs.compile(content);

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

//For Gmail
// 2FA disable.
// Oauth: Get access token

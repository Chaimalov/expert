"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const sendEmail = (email, subject, message) => {
    console.log("------sending email------");
    const msg = {
        to: email,
        from: "expirebyexpert@gmail.com",
        subject,
        html: message,
    };
    mail_1.default.send(msg).then((response) => {
        console.log(response);
    }, (error) => {
        if (error.response) {
            console.error(error.response.body);
        }
    });
};
exports.sendEmail = sendEmail;

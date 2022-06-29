"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: String,
    age: Number,
    username: String,
    password: String,
});
const User = (0, mongoose_1.model)("user", UserSchema);
exports.default = User;

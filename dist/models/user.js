"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: String,
    age: Number,
    username: { unique: true, type: String },
    hash: String,
    role: {
        type: String,
        enum: ["Admin", "Writer", "Reader"],
    },
});
const User = (0, mongoose_1.model)("user", UserSchema);
exports.default = User;

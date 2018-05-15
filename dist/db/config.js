"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db = new sequelize_1.default('lms', '', '', {
    /*
        host: 'localhost',
    */
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 1,
        idle: 15000
    },
    storage: './data.db'
});
exports.db = db;

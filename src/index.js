"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const routes_1 = __importDefault(require("./routes"));
const cors_1 = require("hono/cors");
const app = new hono_1.Hono();
app.use('*', (0, cors_1.cors)());
app.route('/api', routes_1.default);
exports.default = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const errors_1 = __importDefault(require("./middlewares/errors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.use((0, helmet_1.default)());
app.get("/", (req, res) => {
    res.send("Main API endpoint");
});
app.use(errors_1.default);
app.use((_req, res) => {
    res
        .status(404)
        .send("Error: The route you're trying to access doesn't exist");
});
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
exports.default = app;

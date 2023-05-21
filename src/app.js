"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({
    extended: false,
}));
app.use(express_1.default.json());
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});
app.use("/api", routes_1.default);
app.get('/', (req, res) => res.status(200).send({ success: true, message: 'Welcome to url shortener api' }));
app.use("*", (req, res) => res.status(404).json({
    success: false,
    error: "route not found",
}));
exports.default = app;

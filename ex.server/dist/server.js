"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const userController_js_1 = __importDefault(require("./controllers/userController.js"));
const productsController_js_1 = __importDefault(require("./controllers/productsController.js"));
const errorHandler_js_1 = require("./middleware/errorHandler.js");
const socketService_js_1 = require("./services/socketService.js");
const app = (0, express_1.default)();
const PORT = 8080;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
io.on("connection", (socket) => {
    console.log("connection made");
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use(socketService_js_1.productsSnapshot);
app.use("/products", productsController_js_1.default);
app.use("/users", userController_js_1.default);
app.use(errorHandler_js_1.errorHandler);
server.listen(PORT, () => console.log("listening on PORT " + PORT));
// dataCollectService.updateProductsExpiryDays();
// alertService.sendEmailToExpired();

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv at the top
dotenv_1.default.config(); // Ensure this is called at the very beginning
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const typeorm_1 = require("typeorm");
const routes_1 = require("./routes");
const errorHandler_1 = require("./middlewares/errorHandler");
const entity_1 = require("./entity");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT,
    credentials: true,
}));
(0, typeorm_1.createConnection)({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [entity_1.User, entity_1.Message, entity_1.Chat, entity_1.ChatHistory],
    synchronize: false,
    logging: false,
})
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connected to the database');
    (0, routes_1.initializeRoutes)(app);
    app.use(errorHandler_1.errorHandler);
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}))
    .catch((error) => console.error('Database connection error:', error));

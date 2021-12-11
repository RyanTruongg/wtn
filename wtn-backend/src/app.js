import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import logger, { stream } from "./configs/logger.js";
import route from "./routes/index.routes.js";

dotenv.config();
const app = express();
const BACKEND_PORT = process.env.BACKEND_PORT || 5000;

// Middlewares
app.use(express.json()); // XMLHttpRequest, ajax, fetch,...
app.use(express.urlencoded({ extended: true })); // FormData
app.use(cors());
app.use(morgan("tiny", { stream }));

route(app);

const server = app.listen(BACKEND_PORT, () => {
  logger.info(`App listening at: http://localhost:${BACKEND_PORT}`);
});

export default server;

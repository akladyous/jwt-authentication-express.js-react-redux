import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import path from "path";
import { dbConnect } from "./config/dbConnect.js";
import { root, users } from "./routes/routes.js";
import {
    errorHandler,
    credentials,
    logger,
    missingRoutes,
    handleCors
} from "./middleware/middleware.js";
import { PORT, COOKIE_SECRET } from './config/env.js'

dbConnect();
const app = express();
app.use(logger);
app.use(credentials);
app.use(cookieParser(COOKIE_SECRET));
app.use(handleCors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", root);
app.use("/api", users);

import { home } from "./routes/home.js"
app.post("/home", home);

import {test} from './routes/test.js'
import { verifyAuth } from './middleware/verifyAuth.js'
import { handleRefreshToken } from './middleware/handleRefreshToken.js'
app.get("api/refresh", handleRefreshToken);
app.get("/test", verifyAuth, test);

app.use(missingRoutes);
app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("\x1b[33m%s\x1b[0m", "mongoDB successfully connected");
    app.listen(PORT, () => {
        console.log(
            "\x1b[34m%s\x1b[0m",
            `ExpressJS is listening on port ${PORT}`
        );
    });
});

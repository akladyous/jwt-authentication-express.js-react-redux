import { allowedOrigins } from "../config/allowedOrigins.js";

export const credentials = (req, res, next) => {
    const origin = req.headers.origin = req.headers.origin || req.headers.host;
    if (allowedOrigins.includes(origin)){
        res.header("Access-Control-Allow-Credentials", true);
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.header(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS"
        );
    };
    next();
};
import Auth from "../util/auth.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/env.js";

export const requireAuth = (req, res, next) => {
    // const token = req.session.token
    // const { authorization } = req.headers;
    // const authHeader = req.headers['authroization'];
    // if (authorization) return res.sendStatus(401)
    // const token = authHeader.split(' ')[1];
    // console.log("authHeader : ", authHeader);

    const token = req.cookies.token;

    if (token) {
        Auth.jwtVerify(token, REFRESH_TOKEN_SECRET)
            .then((decodedToken) => {
                console.log("decodedToken : ", decodedToken);
                req.user = decodedToken.email;
                next();
            })
            .catch((error) => {
                error.status = 403;
                error.message = "invalid token";
                next(error);
            });
    } else {
        // res.cookie("app.sid", "", { maxAge: 1 });
        // res.cookie("token", "", { maxAge: 1 });
        // req.session.destroy();
        const error = new Error('User Authentication Error - Invalid session ID')
        error.status = 500
        next(error)
    };
};

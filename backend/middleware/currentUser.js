import Auth from "../util/auth.js";
import { User } from "../models/Users.js";

export const currentUser = (req, res, next) => {
    // const token = req.cookies.token;
    const token = req.session.token;

    if (token) {
        Auth.jwtVerify(token)
            .then((decodedToken) => {
                console.log("decodedToken : ", decodedToken);
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            })
            .catch((error) => {
                res.locals.user = null;
                error.status = 500;
                error.message = "invalid token";
                next(error);
            });
    } else {
        res.locals.user = null;
        next();
    }
};

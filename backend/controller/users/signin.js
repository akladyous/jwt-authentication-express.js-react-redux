import { User } from "../../models/Users.js";
import Auth from "../../util/auth.js";
import {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TIMEOUT,
    REFRESH_TIMEOUT,
    COOKIE_TIMEOUT,
} from "../../config/env.js";

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(409)
            .json({ error: { message: "Missing e-mail or password" } });
    }

    try {
        const user = await User.findOne({ email: email }).exec();
        if (!user) {
            return res.status(401).json({
                error: { message: "Unauthorized User - user not found" },
            }); //unauthorized
        }
        const validPassword = await Auth.isValidPassword(
            password,
            user.password
            );
        if (!validPassword) {
            return res.status(500).json({
                error: { message: "Unauthorized User - wrong password" },
            });
        }
        const accessToken = await Auth.jwtSign(
            { id: user._id, email: user.email, lastLoginAt: user.lastLoginAt },
            ACCESS_TOKEN_SECRET,
            ACCESS_TIMEOUT
        );

        const refreshToken = await Auth.jwtSign(
            { id: user._id, email: user.email, lastLoginAt: user.lastLoginAt },
            REFRESH_TOKEN_SECRET,
            REFRESH_TIMEOUT
        );
        user.refreshToken = refreshToken;
        user.lastLoginAt = new Date()
        const result = await user.save();
        
        // req.session.token = refreshToken;
        res.cookie("token", refreshToken, {
            maxAge: COOKIE_TIMEOUT,
            httpOnly: true,
            // sameSite: "None",
            // secure: true,
        });
        res.status(200).json(accessToken);

    } catch (error) {
        next(error);
    }
};

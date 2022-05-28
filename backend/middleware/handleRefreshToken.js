import {
    ACCESS_TIMEOUT,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
} from "../config/env.js";
import { User } from "../models/Users.js";
import Auth from "../util/auth.js";

export const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.token)
        return res
            .status(403)
            .json({ error: "User Authorization Error: Missing Token" });
    const refreshToken = cookies.token;

    const user = await User.findOne({ refreshToken }).exec();
    if (!user)
        return res
            .status(403)
            .json({ error: "User Authorization Error: Forbidden" });

    Auth.jwtVerify(refreshToken, REFRESH_TOKEN_SECRET)
        .then((decoded) => {
            if (user.email !== decoded.email) {
                return Promise.reject(
                    "Authentication Error - email doesn't match"
                );
            }
            Auth.jwtSign(
                {
                    id: decoded._id,
                    email: decoded.email,
                    lastLoginAt: decoded.lastLoginAt,
                },
                ACCESS_TOKEN_SECRET,
                ACCESS_TIMEOUT
            )
                .then((accessToken) => {
                    res.status(200).json(accessToken);
                })
                .catch((error) => {
                    return res.status(403).json({
                        error: "Authentication Error : Sign Token",
                    });
                });
        })
        .catch((error) => {
            return res.status(403).json({ error: error });
        });
};

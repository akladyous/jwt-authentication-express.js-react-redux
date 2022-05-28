import bcrypt from "bcrypt";
import Auth from "../../util/auth.js";
import { User } from "../../models/Users.js";
import {
    REFRESH_TOKEN_SECRET,
    REFRESH_TIMEOUT,
    ACCESS_TOKEN_SECRET,
    ACCESS_TIMEOUT,
    COOKIE_TIMEOUT,
} from "../../config/env.js";

const handleErrors = (err) => {
    if (err.code === 11000) {
        return { error: "Email already exists" };
    }
    let errors = { email: "", password: "" };
    if (err.message.includes("validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return { ...errors, message: err.message };
};

export const signup = async (req, res) => {
    if (!req.body?.email || !req.body?.password) {
        return res
        .status(409)
        .json({ error: { message: "Missing e-mail or password" } });
    }
    const { email, password } = req.body;
    
    try {
        const userExists = await User.findOne({ email }).exec();
        if (userExists) {
            return res
                .status(409)
                .json({ error: { message: "User already Exists" } });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email: email,
            password: hashedPassword,
            lastLoginAt: new Date(),
        });
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

        // req.session.token = refreshToken;
        res.cookie("token", refreshToken, {
            maxAge: COOKIE_TIMEOUT,
            httpOnly: true,
            sameSite: "None",
            // secure: true,
        });
        res.status(200).json(accessToken);

    } catch (error) {
        let customError = handleErrors(error);
        customError.status = 409
        // next(new Error(error.message.split(",")));
        // return res.status(500).json({ error: error.message.split(",") });
        console.log('error : ', error)
        return res.status(409).json({error: customError})
        
    }

};

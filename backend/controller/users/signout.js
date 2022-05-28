import { User } from "../../models/Users.js";

export const signout = async (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.token) return res
        .status(204)
        .json({ error: "User Authorization Error: Unable to logout" });
    const refreshToken = cookies.token;

    const userExists = await User.findOne({ refreshToken }).exec();
    if (!userExists) {
        res.clearCookie('token', { httpOnly: true, sameSite: 'None', secure: true});
        return res
            .status(403)
            .json({ error: "User Authorization Error: User not found" });
    }

    userExists.refreshToken = null;
    const result = await userExists.save();
    // console.log('signout controller - after: logout-> ', result)

    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
    });
    res.cookie('token', '', {maxAge: 1})
    // res.cookie('app.sid', '', {maxAge: 1})
    // req.session.destroy()
    res.status(204).json({message: 'Logout successful completed'})
}
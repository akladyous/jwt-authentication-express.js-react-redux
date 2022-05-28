import jwt from "jsonwebtoken";
import { User } from "../models/Users.js";

export const home = async (req, res, next) => {
    const { email, password } = req.body;

    // console.log('headers : ', req.headers)
    console.log("------------------------");
    console.log("req.user  : ", req.user);
    console.log("------------------------");
    console.log("req.headers.authorization : ", req.headers.authorization);
    console.log("------------------------");
    // console.log("req.cookie : ", req.cookies);
    // console.log("------------------------");
    // console.log("req.cookie.token : ", req.cookies.token);
    // console.log("------------------------");
    // console.log("req.signedCookies.token : ", req.signedCookies.token);
    // console.log("------------------------");
    // console.log("req.headers.cookie: ", req.headers.cookie);

    // req.session.email = email;
    // req.session.password = password;

    // const user = await User.create({ email, password });
    // console.log(user)
    // console.log(user._id)

    // const userExists = await User.findOne({ email }).exec();
    // console.log("userExists : ", userExists);

    // User.findOneAndUpdate(
    //     { email: email },
    //     { lastLoginAt: new Date(), password: email },
    //     {new: true})
    //     .then(record => {
    //         console.log(record)
    //     })
    //     .catch(error => console.log(error))

    // const updated = await User.findOneAndUpdate(
    //     { email: email },
    //     { lastLoginAt: new Date(), password: email },
    //     {new: true},
    //     (error, doc) => {
    //         if(error) {
    //             res.status(409).json({error: 'error updating user'});
    //         }
    //         console.log('updated user : ', doc)
    //     }

    // );
    // console.log('updated : ', updated)
    res.status(200).json({ message: "home" });
};

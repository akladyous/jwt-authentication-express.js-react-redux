import Auth from "../../util/auth.js";
import { User } from "../../models/Users.js";

export const updateUser = (req, res, next) => {
    const { token } = req.session;
    const { cookieToken } = req.cookies;
    const { userId } = req.params;
    const { email, password } = req.body;
    // const userParams = (({ email, password }) => ({ email, password }))(
        //     req.body
        // );
        // console.log('cookie: ', req.headers.cookie)
        if (!cookieToken && !token  && (cookieToken !== token))
            return res
                .status(403)
                .json({ error: "forbidden request - invalid token" });
        const requestToken = authorization.split(".")[1];
        
        if (token) {
            Auth.jwtVerify(token)
            .then((decodedToken) => {
                console.log("decodedToken : ", decodedToken);
                const { payload: { id} } = decodedToken;
                if (id !== userId) res.status(403).json({ error: "forbidden request" });
                
                const user = User.findByIdAndUpdate(
                    id,
                    { email: email, password: password },
                    { new: true },
                    (error, userRecord) => {
                        if (error) {
                            res.status(404).json({ error: "Internal Server Error" });
                        }
                        console.log("userRecord : ", userRecord);
                        const { _id, email } = userRecord;
                        Auth.jwtSign( {id: _id, email: email}, );
                        res.status(200).json(token)
                    }
                );
            })
            .catch((error) => {
                error.status = 500;
                error.message = "invalid token";
                next(error);
            });
    } else {
        const error = new Error(
            "User Authentication Error - Invalid session ID"
        );
        error.status = 500;
        next(error);
    }
};

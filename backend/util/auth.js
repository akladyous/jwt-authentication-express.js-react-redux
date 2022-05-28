import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default class Auth {

    static createSession(token) {
        req.session.token = token;
    }

    static destroySession() {
        // res.cookie('token', '', {maxAge: 1})
        res.cookie("app.sid", "", { maxAge: 1 });
        // req.session.cookie.maxAge = 1000
        // req.session.cookie.expires = new Date(Date.now()) + 1000
        req.session.destroy();
    }

    static jwtSign(payload, secret, timeout) {
        return new Promise((resolve, reject) => {
            jwt.sign(
                payload,
                secret,
                { expiresIn: timeout },
                (jwtError, token) => {
                    if (jwtError) {
                        jwtError.status = 500;
                        reject(new Error(jwtError));
                    } else {
                        resolve(token);
                    }
                }
            );
        });
    }
    
    static jwtVerify(token, secret) {
        return new Promise( (resolve, reject) => {
            jwt.verify(token, secret, (error, decoded) => {
                if (error) {
                    error.status = 500;
                    reject(error);
                }
                resolve(decoded);
            });
        } )
    }

    static hashPassword(password, salt = 10) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(salt, function (saltError, salt) {
                if (saltError) {
                    saltError.status = 500
                    reject(saltError);
                } 
                bcrypt.hash(password, salt, function (hashError, hashPassword) {
                    if (hashError) {
                        hashError.status = 500
                        reject(hashError);
                    }
                    resolve(hashPassword);
                });
                
            });
        });
    }

    static isValidPassword(password, hashedPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hashedPassword, function (error, result) {
                if(error){
                    error.status = 500
                    reject(error)
                }
                resolve(result);
            })
        })
    }
}



// const JsonWebToken = {
//     secret: JWT_SECRET,
//     expiration: '1d',
//     sign: function(payload){
//         return new Promise((resolve, reject) => {
//             jwt.sign(
//                 {payload}, 
//                 this.secret, 
//                 { expiresIn: this.expiration },
//                 (error, token) =>{
//                     if (error) {
//                         reject(new Error(error));
//                     } else {
//                         resolve(token)
//                     }
//                 }
//             );
//         });

//     }
// }

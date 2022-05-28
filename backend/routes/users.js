import express from 'express';
import { signup } from '../controller/users/signup.js';
import { signin } from '../controller/users/signin.js';
import { signout } from '../controller/users/signout.js';
import { updateUser } from "../controller/users/updateUser.js"
export const users = express.Router();

users.get("/users", (req, res) => {
    res.status(200).send('<h1>users page</h1>')
});

users.post("/users/signup", signup)
users.post("/users/signin", signin)
users.delete('/users/signout', signout)
users.patch('/users/update/:userId', updateUser)

users.all("/users/*", (req, res, next) => {
    const error = new Error('Path not found')
    error.name = 'Route error'
    error.status = 404
    next(error);
})

import express from "express";

export const root = express.Router();
root.get("/", (req, res) =>{
    res.status(200).json({
        message: "home page"
    })
});


import {Request, Response} from "express";

export const authMiddleware = (req:Request, res:Response, next: any) => {
    if (req.query.token === "123") {
        next()
    } else {
       return res.send(401)
    }
}
import {Request, Response, Router} from "express";
import {videos} from "../db-in-memory";

export const testingRouter = Router({})

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    // @ts-ignore
    videos = []
    res.status(204).send(videos)
    return
})
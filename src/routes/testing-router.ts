import {Request, Response, Router} from "express";
import {videosRepositories} from "../repositories/video-repositories";

export const testingRouter = Router({})

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    const deleteAllData = videosRepositories.deleteAllData()
    return res.status(204).send(deleteAllData)
})
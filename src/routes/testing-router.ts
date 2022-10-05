import {Request, Response, Router} from "express";
import {blogsRepositories} from "../repositories/blogs-repositories";
import {postsRepositories} from "../repositories/post-repositories";

export const testingRouter = Router({})

testingRouter.delete('/all-data',
    async (req: Request, res: Response) => {
        const deleteAllBlogs = await blogsRepositories.deleteAllData()
        const deleteAllPosts = await postsRepositories.deleteAllData()
        if (!deleteAllBlogs && !deleteAllPosts) {
            return res.status(204)
        }
        return
    })
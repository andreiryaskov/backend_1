import {Request, Response, Router} from "express";
import {blogsRepositories} from "../repositories/blogs-repositories";
import {postsRepositories} from "../repositories/post-repositories";

export const testingRouter = Router({})

testingRouter.delete('/all-data',
    async (req: Request, res: Response) => {
    console.log('all-data')
        const deleteAllBlogs = await blogsRepositories.deleteAllData()
        const deleteAllPosts = await postsRepositories.deleteAllData()
        console.log('after')
        // const deleteAllPosts = await postsRepositories.deleteAllData()
        if (deleteAllPosts || deleteAllBlogs) {
            return res.status(204).send()
        }
        console.log('no result')
        return res.status(404).send()
    })
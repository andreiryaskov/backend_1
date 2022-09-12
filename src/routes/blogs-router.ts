import {Request, Response, Router} from "express";

export const blogsRouter = Router({})

blogsRouter.get('/', (req:Request, res:Response) => {
    const allBlogs = blogsRepositories.getAllBlogs()
    return res.status(200).send(allBlogs)
})

blogsRouter.post('/', (req:Request, res:Response) => {
    const name = req.body.name
    const youtubeUrl = req.body.youtubeUrl
    const newBlog = blogsRepositories.createNewBlog(name, youtubeUrl)
    const errorCreateBlog = blogsRepositories.createdNewBlogError(name, youtubeUrl)

    // if (unauthorized) {
    //     return res.status(401).send()
    // }

    if (!errorCreateBlog) {
        return res.status(201).send(newBlog)
    } else {
        return res.status(400).send(errorCreateBlog)
    }
})
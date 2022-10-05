import {Request, Response, Router} from "express";
import {createBlogValidation} from "../middlewares/blogs-validation";
import {validationMiddleware} from "../middlewares/validationMiddleware";
import {basicAuthorisation} from "../middlewares/auth-middleware";
import {blogsRepositories} from "../repositories/blogs-repositories";

export const blogsRouter = Router({})

blogsRouter.get('/',
    async (req: Request, res: Response) => {
        const allBlogs = await blogsRepositories.getAllBlogs()
        return res.status(200).send(allBlogs)
    })
blogsRouter.post('/',
    basicAuthorisation,
    createBlogValidation,
    validationMiddleware,
    async (req: Request, res: Response) => {
        const name = req.body.name
        const youtubeUrl = req.body.youtubeUrl
        const newBlog = await blogsRepositories.createNewBlog(name, youtubeUrl)

        if (newBlog) {
            return res.status(201).send(newBlog)
        }
    })
blogsRouter.get('/:id',
    async (req: Request, res: Response) => {
    const id = req.params.id
    const findBlogById = await blogsRepositories.getBlogById(id)

    if (findBlogById) {
        return res.status(200).send(findBlogById)
    } else {
        return res.status(404).send()
    }
})
blogsRouter.put('/:id',
    basicAuthorisation,
    createBlogValidation,
    validationMiddleware,
    async (req: Request, res: Response) => {
        const id = req.params.id
        const name = req.body.name
        const youtubeUrl = req.body.youtubeUrl
        const updateBlog = await  blogsRepositories.updateBlogById(id, name, youtubeUrl)

        if (updateBlog) {
            return res.status(204).send()
        } else {
            return res.status(404).send()
        }
    })
blogsRouter.delete('/:id',
    basicAuthorisation,
    (req: Request, res: Response) => {
        const id = req.params.id
        const deleteBlog = blogsRepositories.deleteBlogById(id)

        if (!deleteBlog) {
            return res.status(404).send()
        } else {
            return res.status(204).send()
        }
    })
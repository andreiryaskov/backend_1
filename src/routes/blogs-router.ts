import {Request, Response, Router} from "express";
import {createBlogValidation} from "../middlewares/blogs-validation";
import {validationMiddleware} from "../middlewares/validationMiddleware";
import {basicAuthorisation} from "../middlewares/auth-middleware";
import {blogsRepositories} from "../repositories/blogs-repositories";

export const blogsRouter = Router({})

blogsRouter.get('/',
    (req: Request, res: Response) => {
        const allBlogs = blogsRepositories.getAllBlogs()
        return res.status(200).send(allBlogs)
    })
blogsRouter.post('/',
    basicAuthorisation,
    createBlogValidation,
    validationMiddleware,
    (req: Request, res: Response) => {
        const name = req.body.name
        const youtubeUrl = req.body.youtubeUrl
        const newBlog = blogsRepositories.createNewBlog(name, youtubeUrl)

        if (newBlog) {
            return res.status(201).send(newBlog)
        }
    })
blogsRouter.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const findBlogById = blogsRepositories.getBlogById(id)

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
    (req: Request, res: Response) => {
        const id = req.params.id
        const name = req.body.name
        const youtubeUrl = req.body.youtubeUrl
        const updateBlog = blogsRepositories.updateBlogById(id, name, youtubeUrl)

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
import {Request, Response, Router} from "express";
import {postsRepositories} from "../repositories/post-repositories";
import {createPostValidation} from "../middlewares/post-validation";
import {basicAuthorisation} from "../middlewares/auth-middleware";
import {validationMiddleware} from "../middlewares/validationMiddleware";

export const postsRouter = Router({})

postsRouter.get('/',
    async (req: Request, res: Response) => {
        const getAllPosts = await postsRepositories.getAllPosts()
        return res.status(200).send(getAllPosts)
    })
postsRouter.post('/',
    basicAuthorisation,
    createPostValidation,
    validationMiddleware,
    async (req: Request, res: Response) => {
        const title = req.body.title
        const shortDescription = req.body.shortDescription
        const content = req.body.content
        const blogId = req.body.blogId
        const createNewPost = await postsRepositories.createNewPost(
            title,
            shortDescription,
            content,
            blogId
        )
        if (createNewPost) {
            return res.status(201).send(createNewPost)
        }
    })
postsRouter.get('/:id',
    async (req: Request, res: Response) => {
        const id = req.params.id
        const getPostById = await postsRepositories.getPostById(id)
        if (getPostById) {
            return res.status(200).send(getPostById)
        } else {
            return res.status(404).send()
        }
    })
postsRouter.put('/:id',
    basicAuthorisation,
    createPostValidation,
    validationMiddleware,
    async (req: Request, res: Response) => {
        const id = req.params.id
        const title = req.body.title
        const shortDescription = req.body.shortDescription
        const content = req.body.content
        const blogId = req.body.blogId
        const updatePostById = await postsRepositories.updatePostById(
            id,
            title,
            shortDescription,
            content,
            blogId)
        if (updatePostById) {
            return res.status(204).send()
        } else {
            return res.status(404).send()
        }
    })
postsRouter.delete('/:id',
    basicAuthorisation,
    async (req: Request, res: Response) => {
        const id = req.params.id
        const deletePostById = await postsRepositories.deletePostById(id)
        if (deletePostById) {
            return res.status(204).send()
        } else {
            return res.status(404).send()
        }
    })
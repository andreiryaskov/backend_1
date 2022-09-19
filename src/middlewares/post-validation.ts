import {body} from "express-validator";
import {blogs} from "../repositories/blogs-repositories";

export const titleValidation =
    body('title')
        .trim()
        .isString()
        .isLength({min:1,max: 30})
        .withMessage('title is not correct')
export const shortDescriptionValidation =
    body('shortDescription')
        .trim()
        .isString()
        .isLength({min:1,max: 100})
        .withMessage('shortDescription is not correct')
export const contentValidation =
    body('content')
        .trim()
        .isString()
        .isLength({min:1,max: 1000})
        .withMessage('content is not correct')

export const blogIdValidation =
    body('blogId')
        .isString()
        .custom((value) => {
            return blogs.find(b => b.id === value)
        })
        .withMessage('blog id is not valid')


export const createPostValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation
]
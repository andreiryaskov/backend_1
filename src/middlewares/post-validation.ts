import {body} from "express-validator";

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
        .trim()
        .isLength({min:1})
        .withMessage('blogId is not correct')

export const createPostValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation
]
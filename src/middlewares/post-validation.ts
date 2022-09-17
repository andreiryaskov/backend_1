import {body} from "express-validator";

export const titleValidation =
    body('title')
        .trim()
        .isLength({max: 30})
        .withMessage('title is not correct')
export const shortDescriptionValidation =
    body('shortDescription')
        .trim()
        .isLength({max: 100})
        .withMessage('shortDescription is not correct')
export const contentValidation =
    body('content')
        .trim()
        .isLength({max: 1000})
        .withMessage('content is not correct')
export const blogIdValidation =
    body('blogId')
        .trim()
        .isString()
        .withMessage('blogId is not correct')

export const createPostValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation
]
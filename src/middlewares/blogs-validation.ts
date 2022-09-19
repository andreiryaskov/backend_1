import {body} from "express-validator";


const url = new RegExp(`^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$`)

export const nameBlogValidation =
    body('name')
        .trim()
        .isString()
        .isLength({min:1,max: 15})
        .withMessage('name is not correct')
export const urlBlogValidation =
    body('youtubeUrl')
        .trim()
        .isLength({min:1, max: 100})
        .matches(url)

export const createBlogValidation = [
    nameBlogValidation,
    urlBlogValidation
]

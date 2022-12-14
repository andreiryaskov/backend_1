import {body} from "express-validator";


export enum Resolutions {
    P144 = "P144", P240 = "P240", P360 = "P360", P480 = "P480", P720 = "P720", P1080 = "P1080", P1440 = "P1440", P2160 = "P2160"
}

const pattern = new RegExp(`^${Resolutions.P144}$|^${Resolutions.P240}$|^${Resolutions.P360}$|^${Resolutions.P480}$|^${Resolutions.P720}$|^${Resolutions.P1080}$|^${Resolutions.P1440}$|^${Resolutions.P2160}$`)

export const resolutionValidation =
    body('availableResolutions')
        .isArray()
        .withMessage('resolution is not array')
        .custom((value) => {
            return value.every((resolation: string) => pattern.test(resolation))
        })
        .withMessage('resolution not found')
        .notEmpty()
        .withMessage('resolution is empty')
export const titleValidation =
    body('title')
        .trim()
        .isLength({min: 1, max: 40})
        .withMessage('title is not correct')
export const authorValidation =
    body('author')
        .trim()
        .isLength({min: 1, max: 20})
        .withMessage('author is not correct')

//putVideoValidation
export const publicationDateValidation =
    body('publicationDate')
        .isString()
        .withMessage("publicationDate !== string")
export const canBeDownloaded =
    body('canBeDownloaded')
        .isBoolean()
        .withMessage("canBeDownloaded !== boolean")
export const minAgeRestriction =
    body('minAgeRestriction')
        .custom((value) => {
            if (value < 1 || value >18) {
                return false
            } else {
                return value
            }
        })
        .withMessage('age is not correct')




export const createVideoValidate = [
    titleValidation,
    authorValidation,
    resolutionValidation
]


export const putVideoValidate = [
    titleValidation,
    authorValidation,
    resolutionValidation,
    minAgeRestriction,
    canBeDownloaded,
    publicationDateValidation
]






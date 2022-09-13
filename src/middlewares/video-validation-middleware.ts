import {body, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";


export enum Resolutions {
    P144 = "P144", P240 = "P240", P360 = "P360", P480 = "P480", P720 = "P720", P1080 = "P1080", P1440 = "P1440", P2160 = "P2160"
}

const pattern = new RegExp(`^${Resolutions.P144}$|^${Resolutions.P240}$|^${Resolutions.P360}$|^${Resolutions.P480}$|^${Resolutions.P720}$|^${Resolutions.P1080}$|^${Resolutions.P1440}$|^${Resolutions.P2160}$`)

export const resolutionValidation =
    body('availableResolutions')
        .isArray()
        .withMessage({
            message: "is array empty",
            field: "availableResolutions"
        })
        .custom((value) => {
            return value.every((resolation: string) => pattern.test(resolation))
        })
        .withMessage({
            message: "string",
            field: "availableResolutions"
        })
        .notEmpty()
        .withMessage({
            message: "string",
            field: "availableResolutions"
        })
export const titleValidation =
    body('title')
        .trim()
        .isLength({min: 1, max: 40})
        .withMessage({
            message: "string",
            field: "title"
        })
export const authorValidation =
    body('author')
        .trim()
        .isLength({min: 1, max: 20})
        .withMessage({
            message: "string",
            field: "author"
        })

//putVideoValidation
export const publicationDateValidation =
    body('publicationDate')
        .isString()
        .withMessage({
            message: "publicationDate !== string",
            field: "publicationDate"
        })
export const canBeDownloaded =
    body('canBeDownloaded')
        .isBoolean()
        .withMessage({
            message: "canBeDownloaded !== boolean",
            field: "canBeDownloaded"
        })
//resolutionValidation
export const minAgeRestriction =
    body('minAgeRestriction')
        .isLength({min: 1, max: 18})
        .withMessage({
            message: "string",
            field: "minAgeRestriction"
        })


export const validationVideoMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errorsMessages = validationResult(req)
    if (!errorsMessages.isEmpty()) {
        res.status(400).json({errorsMessages: errorsMessages.array()})
    } else {
        next()
    }
}
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






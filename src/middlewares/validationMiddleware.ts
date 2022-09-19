import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errorsMessages = validationResult(req)
    if (!errorsMessages.isEmpty()) {
        let newErrors = errorsMessages.array({onlyFirstError: true});
        res.status(400).json({
            errorsMessages: newErrors.map((e) => ({
                message: e.msg,
                field: e.param
            }))
        })
    } else {
        next()
    }
}
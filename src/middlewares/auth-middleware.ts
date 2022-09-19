import {NextFunction, Request, Response} from "express";

export const basicAuthorisation = (req: Request, res: Response, next: NextFunction) => {
    const stdAuth = {login: 'admin', password: 'qwerty'}
    const auth = req.headers.authorization
    if (!auth) return res.status(401).send()
    const token = auth.split(' ')[1]
    const [login, password] = Buffer.from(token, 'base64').toString().split(':')
    const validHeader = `Basic ${login}:${password}`

    if (login !== stdAuth.login || password !== stdAuth.password) {
        return res.status(401).send()
    } else if (req.headers.authorization !== validHeader){
        return res.status(400).send()
    }
    next()
}

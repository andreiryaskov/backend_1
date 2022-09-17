import {Request, Response, Router} from "express";
import {videosRepositories} from "../repositories/video-repositories";
import {
    createVideoValidate,
    putVideoValidate
} from "../middlewares/video-validation";
import {validationMiddleware} from "../middlewares/validationMiddleware";

export const videoRouter = Router({})


videoRouter.get('/', (req: Request, res: Response) => {
    const getAllVideos = videosRepositories.getAllVideos()
    return res.status(200).send(getAllVideos)
})
videoRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const findVideo = videosRepositories.getVideoId(id)

    if (findVideo) {
        return res.status(200).send(findVideo)
    } else {
        return res.status(404).send()
    }
})

videoRouter.post('/',
    createVideoValidate,
    validationMiddleware,
    (req: Request, res: Response) => {
        const title = req.body.title
        const author = req.body.author
        const availableResolutions = req.body.availableResolutions

        const postNewVideo = videosRepositories.postVideo(title, author, availableResolutions)

        if (postNewVideo) {
            return res.status(201).send(postNewVideo)
        }
    })

videoRouter.put('/:id',
    putVideoValidate,
    validationMiddleware,
    (req: Request, res: Response) => {
    const id = +req.params.id
    const title = req.body.title
    const author = req.body.author
    const minAgeRestriction = req.body.minAgeRestriction
    const availableResolutions = req.body.availableResolutions
    const canBeDownloaded = req.body.canBeDownloaded
    const publicationDate = req.body.publicationDate

    const putVideo = videosRepositories.putVideo(
        id,
        title,
        author,
        minAgeRestriction,
        availableResolutions,
        canBeDownloaded,
        publicationDate
    )

    if (!putVideo) {
        return res.status(404).send()
    } else {
        return res.status(204).send()
    }
})

videoRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const deleteVideoId = videosRepositories.deleteVideoId(id)

    if (!deleteVideoId) {
        return res.status(404).send()
    } else {
        return res.status(204).send()
    }
})

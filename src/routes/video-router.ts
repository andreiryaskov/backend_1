import {Request, Response, Router} from "express";
import {videos} from "../db-in-memory";

export const videoRouter = Router({})


videoRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
    return
})

videoRouter.post('/', (req: Request, res: Response) => {
    const title = req.body.title //40
    const author = req.body.author //20
    const availableResolutions = req.body.availableResolutions

    if (!title
        || title.length > 40
        || typeof title !== "string"
        || !title.trim()) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "string",
                    field: "title"
                }
            ]
        })
        return
    }

    console.log('author', author)
    if (!author ||
        author.length > 20
        || typeof author !== "string"
        || !author.trim()) {
        res.status(400).send({
            errorsMessages: [
                { message: "string", field: "author" },
                {
                    message: "string",
                    field: "title"
                }
            ]
        })
        return
    }
    // new Date() => 2022-09-01T13:52:07.956Z
    // Date.now() => 11232145217491

    // +(new Date()) => 12312451412

    // const second = 1000
    // const minute = second * 60
    // const hour = minute * 60
    // const day = hour * 24
    //
    // const inThisMoment = Date.now()
    // const tomorrowInNumber = inThisMoment + day
    // const tomorrowInDate = new Date(tomorrowInNumber)

    const now = new Date();
    const createdAt = new Date(now)
    now.setDate(now.getDate() + 1)

    console.log("videos",videos)
    const newVideo = {
        "id": videos.length + 1,
        "title": title,
        "author": author,
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": createdAt.toISOString(),
        "publicationDate": now.toISOString(),
        "availableResolutions": availableResolutions
    }

    // @ts-ignore
    videos.push(newVideo)
    res.status(201).send(newVideo)
    return;
})

videoRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const video = videos.find(v => v.id === id)

    console.log('video', video)
    if (!video) {
        return res.status(404).send()
    } else {
        return res.status(200).send(video)
    }
})

videoRouter.put('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const video = videos.find(v => v.id === id)
    const title = req.body.title //
    const author = req.body.author //
    const minAgeRestriction = req.body.minAgeRestriction //
    const availableResolutions = req.body.availableResolutions //
    const canBeDownloaded = req.body.canBeDownloaded //
    const publicationDate = req.body.publicationDate //

    if (typeof publicationDate !== "string") {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "string",
                    field: "title"
                },
                {
                    message: "publicationDate !== string",
                    field: "publicationDate"
                }
            ]
        })
        return
    }

    if (typeof canBeDownloaded !== "boolean") {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "string",
                    field: "title"
                },
                {
                    message: "canBeDownloaded !== boolean",
                    field: "canBeDownloaded"
                }
            ]
        })
        return
    }

    if (!availableResolutions) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "string",
                    field: "title"
                },
                {
                    message: "string",
                    field: "availableResolutions"
                }
            ]
        })
        return
    }

    if (minAgeRestriction < 1 || minAgeRestriction > 18) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "string",
                    field: "title"
                },
                {
                    message: "string",
                    field: "minAgeRestriction"
                }
            ]
        })
        return
    }

    if (title.length > 40
        || !title
        || typeof title !== "string"
        || !title.trim()) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "string",
                    field: "title"
                }
            ]
        })
        return
    }
    if (author.length > 20
        || !author
        || typeof author !== "string"
        || !author.trim()) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "string",
                    field: "title"
                },
                {
                    message: "string",
                    field: "author"
                }
            ]
        })
        return
    }

    // const second = 1000
    // const minute = second * 60
    // const hour = minute * 60
    // const day = hour * 24
    //
    // const inThisMoment = Date.now()
    // const tomorrowInNumber = inThisMoment + day
    // const tomorrowInDate = new Date(tomorrowInNumber)

    if (video) {
        video.title = title
        video.author = author
        video.minAgeRestriction = minAgeRestriction
        video.canBeDownloaded = canBeDownloaded
        video.availableResolutions = availableResolutions
        video.publicationDate = publicationDate //преобразовать и прибавить день
        res.status(204).send(video)
        return
    } else {
        res.status(404).send()
        return;
    }
})

// videoRouter.delete('/:id', (req: Request, res: Response) => {
//     const id = +req.params.id
//     const newVideo = videos.filter(v => v.id !== id)
//
//     if (newVideo.length < videos.length) {
//         videos = newVideo
//         res.status(204)
//         return
//     } else {
//         res.status(404)
//     }
// })


videoRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const videoToDeleteIndex = videos.findIndex(v => v.id === id)

    console.log('index', videoToDeleteIndex)
    if (videoToDeleteIndex !== -1) {
        // videos = videos.filter(v => v.id !== id)
        // for (let i = 0; i < videos.length; i++) {
        //     if (videos[i].id === id) {
        //         videos.splice(i, 1)
        //         res.status(204).send(videos)
        //         return
        //     }
        // }
        videos.splice(videoToDeleteIndex, 1)
        return res.status(204).send(videos)

    } else {
        return res.status(404).send()
    }
})

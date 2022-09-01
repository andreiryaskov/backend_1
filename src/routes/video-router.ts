import {Request, Response, Router} from "express";

export const videoRouter = Router({})

let videos = [
    {
        "id": 0,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2022-09-01T08:30:04.635Z",
        "publicationDate": "2022-09-01T08:30:04.635Z",
        "availableResolutions": [
            "P144"
        ]
    }
]


videoRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
})

videoRouter.post('/', (req: Request, res: Response) => {
    const title = req.body.title //40
    const author = req.body.author //20

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
                    field: "author"
                }
            ]
        })
        return
    }

    const newVideo = {
        "id": videos.length + 1,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": new Date(),
        "publicationDate": new Date(),
        "availableResolutions": [
            "P144"
        ]
    }

    // @ts-ignore
    videos.push(newVideo)
    res.status(201).send(newVideo)
})

videoRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const video = videos.find(v => v.id === id)

    if (!video) {
        res.status(404)
        return
    } else {
        res.status(200).send(video)
    }
})

videoRouter.put('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const video = videos.find(v => v.id === id)
    const title = req.body.title
    const author = req.body.author

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
                    field: "author"
                }
            ]
        })
        return
    }

    if (video) {
        video.title = title
        video.author = author
        res.status(204)
        return
    } else {
        res.status(404)
    }
})

videoRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const newVideo = videos.filter(v => v.id !== id)

    if (newVideo.length < videos.length) {
        videos = newVideo
        res.status(204)
        return
    } else {
        res.status(404)
    }
})

videoRouter.delete('/all-data', (req: Request, res: Response) => {
    videos = []
    res.status(204)
})

// videoRouter.delete('/:id', (req: Request, res: Response) => {
//     const id = +req.params.id
//     const newVideo = videos.find(v => v.id === id)
//
//     if (newVideo) {
//         for (let i = 0; i < videos.length; i++) {
//             if (videos[i].id === id) {
//                 videos.splice(i, 1)
//                 res.status(204)
//                 return
//             }
//         }
//     } else {
//         res.status(404)
//     }
// })

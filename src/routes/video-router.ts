import {Request, Response, Router} from "express";

export const videoRouter = Router({})

let videos = [
    {
        id: 0,
        title: "string",
        author: "string"
    }
]


videoRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
})

videoRouter.post('/', (req: Request, res: Response) => {
    const title = req.body.title
    if (title === null) {
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

    if (title.length > 40 || !title || typeof title !== "string" || !title.trim()) {
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

    const newVideo = {
        id: videos.length + 1,
        title: title,
        author: "string"
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})

videoRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if (!id) {
        res.status(404)
        return
    }
    const video = videos.find(v => v.id === id)

    if (video) {
        res.status(200).send(video)
        return
    } else {
        res.status(404)
    }
})

videoRouter.put('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if (!id) {
        res.status(404)
        return
    }
    const video = videos.find(v => v.id === id)
    const title = req.body.title

    if (!title || typeof title !== "string" || !title.trim() || title.length > 40) {
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

    if (video) {
        video.title = title
        res.status(204)
        return
    } else {
        res.status(404)
    }
})

videoRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id

    if (!id) {
        res.status(404)
        return
    }

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

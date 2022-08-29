import {Request, Response, Router} from "express";

export const videoRouter = Router({})

let videos = [
    {
        "id": 0,
        "title": "string",
        "author": "string"
    }
]


videoRouter.get('/', (req: Request, res: Response) => {
    res.send(videos)
})

videoRouter.post('/', (req: Request, res: Response) => {
    let title = req.body.title
    if (!title || typeof title !== "string" || !title.trim() || title.length > 40) {
        res.status(400).send({
            errorsMessages: [
                {
                    "message": "string",
                    "field": "string"
                }
            ]
        })
        return
    }

    const newVideo = {
        "id": videos.length + 1,
        "title": title,
        "author": "string"
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})

videoRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const video = videos.find(v => v.id !== id)
    if (video) {
        res.status(200).send(video)
        return
    } else {
        res.status(404)
    }
})

videoRouter.put('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const video = videos.find(v => v.id === id)
    let title = req.body.title
    if (!title || typeof title !== "string" || !title.trim() || title.length > 40) {
        res.status(400).send({
            errorsMessages: [
                {
                    "message": "string",
                    "field": "string"
                }
            ]
        })
        return
    }
    if (video) {
        video.title = title
        res.status(204).send(video)
    } else {
        res.send(404)
    }
})

videoRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const newVideo = videos.filter(v => v.id !== id)
    if(newVideo.length < videos.length) {
        videos = newVideo
        res.send(204)
    } else {
        res.send(404)
    }
})
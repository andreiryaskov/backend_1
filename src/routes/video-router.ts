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
    return res.status(200).send(videos)
})

videoRouter.post('/', (req: Request, res: Response) => {
    const title = req.body.title

    if (!title || title.length > 40 || !title.trim() || title !== "string") {
        return res.status(400).send({
            errorsMessages: [
                {
                    "message": "string",
                    "field": "string"
                }
            ]
        })
    }

    const newVideo = {
        "id": videos.length + 1,
        "title": "title",
        "author": "string"
    }
    videos.push(newVideo)
    res.status(201).send(videos)
})

videoRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const video = videos.find(v => v.id === id)

    if (video) {
        return res.status(200).send(video)
    } else {
        return res.status(404)
    }

})

videoRouter.put('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const title = req.body.title
    const updateVideo = videos.find(v => v.id === id)

    if (title.length > 40) {
        return res.status(400).send({
            "errorsMessages": [
                {
                    "message": "title is incorrect values",
                    "field": "string"
                }
            ]
        })
    }


    if (updateVideo) {

        updateVideo.title = title
        return res.status(204).send(updateVideo)
    } else {
        return res.status(404)
    }
})

//Delete video id
videoRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const video = videos.find(v => v.id === id)

    // if (videos.length === newVideosArray.length) {
    //
    // }
    if (video) {
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].id === id) {
                videos.splice(i, 1)
                res.send(204)
                return
            }
        }
    } else {
        return res.status(404)
    }


})
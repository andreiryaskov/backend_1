import {Request, Response, Router} from "express";
import cors from 'cors';
import bodyParser from "body-parser";
const express = require('express')
const app = express()
const port = process.env.PORT;
const middlewareParser = bodyParser({})
const videosRouter = Router({})

videosRouter.use(middlewareParser)
videosRouter.use(cors())

let videos = [
    {
        "author": "string",
        "id": 0,
        "title": "string"
    }
]

videosRouter.get('/videos', (req: Request, res: Response) => {
    res.status(200).send(videos)
})

videosRouter.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const video = videos.find(v => v.id === id)
    if (video) {
        res.status(200).send(video)
    } else {
        res.status(404)
    }
})

videosRouter.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
        "id": videos.length + 1,
        "title": "string",
        "author": "string"
    }
    if (newVideo) {
        videos.push(newVideo)
        res.status(201).send(newVideo)
    } else {
        res.status(400).send({
            "errorsMessages": [
                {
                    "message": "string",
                    "field": "string"
                }
            ]
        })
    }
})

//Delete video id
videosRouter.delete('/videos/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})

//All data clear
videosRouter.delete('/all-data', (req: Request, res: Response) => {
    videos = []
    res.send(204)
})

videosRouter.put('/videos/:id', (req: Request, res: Response) => {
    const video = videos.find(v => v.id === +req.params.id)
    if (req.body.title.length > 40) {
        res.status(400).send({
            "errorsMessages": [
                {
                    "message": "string",
                    "field": "string"
                }
            ]
        })
    }
    if (video) {
        video.title = req.body.title
        res.status(204).send(video)
    } else {
        res.status(404)
    }
})


app.listen(port, () => {
    console.log('========server ok=============')
})
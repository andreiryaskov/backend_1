import {Request, Response} from "express";
import cors from 'cors';
import bodyParser from "body-parser";

const express = require('express')
const app = express()
const port = process.env.PORT;
const middlewareParser = bodyParser({})

app.use(middlewareParser)
app.use(cors())

let videos = [
    {
        "author": "string",
        "id": 0,
        "title": "string"
    }
]

app.get('/videos', (req: Request, res: Response) => {
    res.status(200).send(videos)
})

app.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const video = videos.find(v => v.id === id)
    if (video) {
        res.status(200).send(video)
    } else {
        res.status(404)
    }
})

app.post('/videos', (req: Request, res: Response) => {
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
app.delete('/videos/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1)
            res.status(204)
            return
        }
    }
    res.send(404)
})

//All data clear
app.delete('/all-data', (req: Request, res: Response) => {
    videos = []
    res.status(204)
})

app.put('/videos/:id', (req: Request, res: Response) => {
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
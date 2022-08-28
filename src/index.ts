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

// const isExistId = (id: number, isIdArray: any[]) => {
//     const index = isIdArray.findIndex(i => i.id === id)
//     return index > -1
//
// }


app.get('/videos', (req: Request, res: Response) => {
    return res.status(200).send(videos)
})

//All data clear
app.delete('/all-data', (req: Request, res: Response) => {
    videos = []
    return res.send(204)
})

app.post('/videos', (req: Request, res: Response) => {
    let title = req.body.title
    if (!title || typeof title !== "string" || !title.trim() || title.length > 40) {
        res.status(400).send({
            errorsMessages: [
                {
                    "message": "string",
                    "field": "string"
                }
            ],
            resultCode: 1
        })
        return
    }
    const newVideo = {
        "id": +(new Date()),
        "title": "string",
        "author": "string"
    }

    videos.push(newVideo)
    return res.status(201).send(newVideo)
})

app.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const video = videos.find(v => v.id === id)
    if (!video) {
        return res.status(404)
    } else if (video) {
        return res.send(video)
    } else {
        return res.status(404)
    }
})

//Delete video id
app.delete('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const newVideos = videos.filter(v => v.id === id)
    if (newVideos.length < videos.length) {
        videos = newVideos
        return res.send(204)
    }

    return res.send(404)
})


app.put('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const video = videos.find(v => v.id === id)

    // if (!isExistId(id, videos)) {
    //     return res.status(404)
    // }
    if (req.body.title.length > 40) {
        return res.status(400).send({
            "errorsMessages": [
                {
                    "message": "string",
                    "field": "string"
                }
            ]
        })
    }
    if (!video) {
        return res.status(404)
    }
    video.title = req.body.title
    if (!video || !video.title || !video.title.trim() || video.title.length > 40) {
        return res.status(400).send({
            errorsMessages: [
                {
                    "message": "string",
                    "field": "string"
                }
            ],
        })
    }
    return res.status(204).send(video)
})


app.listen(port, () => {
    console.log('========server ok=============')
})
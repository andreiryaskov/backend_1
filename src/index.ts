import {Request, Response} from "express";
import cors from 'cors';
import bodyParser from "body-parser";


const express = require('express')
const app = express()
const port = process.env.PORT;
const middlewareParser = bodyParser({})

app.use(middlewareParser)
app.use(cors())

const videos = [
    {
        id: 0,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2022-08-19T11:36:24.965Z",
        "publicationDate": "2022-08-19T11:36:24.965Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 1,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2022-08-19T11:36:24.965Z",
        "publicationDate": "2022-08-19T11:36:24.965Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        id: 2,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2022-08-19T11:36:24.965Z",
        "publicationDate": "2022-08-19T11:36:24.965Z",
        "availableResolutions": [
            "P144"
        ]
    }
]

app.get('/videos', (req: Request, res: Response) => {
    res.sendStatus(200)
    res.send(videos)

})

app.get('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
    console.log('videis', videos)
    const video = videos.find(v => v.id === id)
    if (video) {
        res.send(video)
    } else {
        res.send(404)
    }
})

app.post('/videos', (req: Request, res: Response) => {
    const date = new Date()
    console.log("TEST")
    const newVideo = {
        id: videos.length + 1,
        title: req.body.title,
        author: req.body.author,
        availableResolutions: req.body.availableResolutions,
        createdAt: date.toString(),
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "publicationDate": date.toString(),
    }
    videos.push(newVideo)
    res.send(newVideo)
})

//Delete video id
app.delete('/videos/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.slice(i, 1)
            res.send(204)
            return
        }
    }
})

//All data clear
app.delete('/testing/all-data', (req: Request, res: Response) => {
    // for (let i = 0; i < videos.length; i++) {
    //     delete videos[i]
    // }
    videos.splice(0, videos.length)

    //videos.slice()
    // res.send(null)
    res.sendStatus(204)
})

app.put('/videos/:id', (req: Request, res: Response) => {
    const newVideo = videos.find(v => v.id === +req.params.id)
    if (newVideo) {
        newVideo.title = req.body.title
        res.send(newVideo)
    } else {
        res.send(404)
    }
})


app.listen(port, () => {
    console.log('========server ok=============')
})
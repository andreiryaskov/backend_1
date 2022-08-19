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
        "id": 0,
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
        "id": 1,
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
        "id": 2,
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

app.get('/hometask_01/api/videos', (req: Request, res: Response) => {
    if (videos) {
        res.send(videos)
        res.send(200)
    } else {
        res.send(404)
    }
})

app.get('/hometask_01/api/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId;
    const video = videos.find(v => v.id === id)
    if (video) {
        res.send(video)
    } else {
        res.send(404)
    }
})

// app.post('/hometask_01/api/videos', (req: Request, res: Response) => {
//     const newVideo = {
//         id: +(new Date()),
//         title: req.body.title,
//         author: 'it-incubator.eu'
//     }
//     videos.push(newVideo)
//     res.send(newVideo)
// })

//Delete video id
app.delete('/hometask_01/api/videos/:id',(req: Request, res: Response)=>{
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.slice(i, 1)
            res.send(204)
            return
        }
    }
})

//All data clear
app.delete('/ht_01/api/testing/all-data',(req: Request, res: Response)=>{
    for (let i = 0; i < videos.length; i++) {
        delete videos[i]
    }
    res.send(null)
})

app.put('/hometask_01/api/videos/:id',(req: Request, res: Response)=>{
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
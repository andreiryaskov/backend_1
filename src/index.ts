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
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

app.get('/hometask_01/api/videos', (req: Request, res: Response) => {
    res.send(videos)
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

app.post('/hometask_01/api/videos', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.send(newVideo)
})

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
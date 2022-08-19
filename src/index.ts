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
        "author": "string",
        "id": 0,
        "title": "string"
    }
]

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos).sendStatus(200)
})

app.get('/videos/:videoId', (req: Request, res: Response) => {
})

app.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
        "id": videos.length + 1,
        "title": "string",
        "author": "string"
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)

})

//Delete video id
app.delete('/videos/:id', (req: Request, res: Response) => {
})

//All data clear
app.delete('/testing/all-data', (req: Request, res: Response) => {
})

app.put('/videos/:id', (req: Request, res: Response) => {
})


app.listen(port, () => {
    console.log('========server ok=============')
})
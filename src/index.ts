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
        "createdAt": "2022-08-19T13:20:09.470Z",
        "publicationDate": "2022-08-19T13:20:09.470Z",
        "availableResolutions": [
            "P144"
        ]
    }
]

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})

app.get('/videos/:videoId', (req: Request, res: Response) => {
})

app.post('/videos', (req: Request, res: Response) => {
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
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
        "title": "string",
        "author": "string",
        "availableResolutions": [
            "P144"
        ]
    }
    const resNewVideo = {
        "id": 0,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2022-08-19T13:20:09.460Z",
        "publicationDate": "2022-08-19T13:20:09.460Z",
        "availableResolutions": [
            "P144"
        ]
    }
    const error = {
        "errorsMessages": [
            {
                "message": "string",
                "field": "string"
            }
        ]
    }
    if (req.body === newVideo) {
        res.send(resNewVideo).sendStatus(201)
    } else {
        res.send(error).sendStatus(400)
    }

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
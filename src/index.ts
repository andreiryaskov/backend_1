import cors from 'cors';
import bodyParser from "body-parser";
import {videoRouter} from "./routes/video-router";
import {testingRouter} from "./routes/testing-router";
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/post-router";
import {runDB} from "./repositories/db";

const express = require('express')
const app = express()
//какой порт ??? 5000 или 27017
const port = process.env.PORT || 5000;

app.use(bodyParser())
app.use(cors())
app.use('/videos', videoRouter)
app.use('/testing', testingRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)


const startApp = async () => {
    await runDB()
    app.listen(port, () => {
        console.log(`==========Example app listaening on port: ${port}==============`)
    })
}
startApp()

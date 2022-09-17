import cors from 'cors';
import bodyParser from "body-parser";
import {videoRouter} from "./routes/video-router";
import {testingRouter} from "./routes/testing-router";
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/post-router";

const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

app.use(bodyParser())
app.use(cors())
app.use('/videos', videoRouter)
app.use('/testing', testingRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)


app.listen(port, () => {
    console.log('========server ok=============')
})
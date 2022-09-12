import cors from 'cors';
import bodyParser from "body-parser";
import {videoRouter} from "./routes/video-router";
import {testingRouter} from "./routes/testing-router";

const express = require('express')
const app = express()
const port = process.env.PORT;
const middlewareParser = bodyParser({})

app.use(middlewareParser)
app.use(cors())
app.use('/videos', videoRouter)
app.use('/testing', testingRouter)





app.listen(port, () => {
    console.log('========server ok=============')
})
import cors from 'cors';
import bodyParser from "body-parser";
import {videoRouter} from "./routes/video-router";

const express = require('express')
const app = express()
const port = process.env.PORT;
const middlewareParser = bodyParser({})

app.use(middlewareParser)
app.use(cors())
app.use('/videos', videoRouter)
app.use('/testing', videoRouter)




app.listen(port, () => {
    console.log('========server ok=============')
})
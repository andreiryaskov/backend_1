import {MongoClient} from "mongodb";


const mongoUri = process.env.mongoURI || "mongodb://localhost:27017"

export const client = new MongoClient(mongoUri)
export const postCollection = client.db("posts").collection("post")
export const blogCollection = client.db("blogs").collection("blogs")

export async function runDB() {
    try {
        await client.connect()
        await client.db("videos").command({ping: 1})
        await client.db("blogs").command({ping: 1})
        await client.db("posts").command({ping: 1})
        console.log("connected to mongo server")
    }
    catch {
        console.log("can`t connect to db")
        await client.close()
    }
}
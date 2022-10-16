import {MongoClient} from "mongodb";

export type BlogType = {
    _id?: string
    id: string
    name: string
    youtubeUrl: string
    createdAt: string
}

export type PostType = {
    _id?: string
    id: string
    title: string
    shortDescription: string[] | string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

const mongoUri = process.env.mongoURI || "mongodb+srv://andreiryaskov1:591154aamongodB@cluster0.ggv2rej.mongodb.net/?retryWrites=true&w=majority"
    // "mongodb://localhost:27017"

export const client = new MongoClient(mongoUri)
console.log('mongoUri', mongoUri)
export const postCollection = client.db("posts").collection<PostType>("posts")
export const blogCollection = client.db("blogs").collection<BlogType>("blogs")

export async function runDB() {
    try {
        await client.connect()
        await client.db("blogs").command({ping: 1})
        await client.db("posts").command({ping: 1})
        console.log("connected to mongo server")
    }
    catch (e) {
        console.log("can`t connect to db", e)
        await client.close()
    }
}
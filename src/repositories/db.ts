import {MongoClient} from "mongodb";


const mongoUri = process.env.mongoURI || "mongodb+srv://andreiryaskov1:591154aamongodB@cluster0.ggv2rej.mongodb.net/?retryWrites=true&w=majority"
    // "mongodb://localhost:27017"

export const client = new MongoClient(mongoUri)
console.log('mongoUri', mongoUri)
export const postCollection = client.db("posts").collection("posts")
export const blogCollection = client.db("blogs").collection("blogs")

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
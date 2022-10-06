import {blogCollection} from "./db";
import {v1} from "uuid";

export const blogsRepositories = {
    async getAllBlogs() {
        return await blogCollection.find().toArray()
    },
    async createNewBlog(name: string, youtubeUrl: string) {

        const now = new Date();
        // const createdAt = new Date(now)

        const newBlog = {
            id: v1(),
            name,
            youtubeUrl,
            createdAt: now.toISOString()
        }
        console.log(newBlog.createdAt)

        await blogCollection.insertOne(newBlog)

        return newBlog
    },
    async getBlogById(id: string) {
        if (id) {
            const getBlogById =  await blogCollection.findOne({id})
            if (getBlogById) {
                const returnObj = {
                    createdAt: getBlogById.createdAt,
                    id: getBlogById.id,
                    name: getBlogById.name,
                    youtubeUrl: getBlogById.youtubeUrl
                }
                return returnObj
            }
        return
        }
    },
    async updateBlogById(id: string, name: string, youtubeUrl: string) {

        const updateNameBlog = await blogCollection.updateOne({id: id}, {$set: {name: name}})
        const updateUrlBlog = await blogCollection.updateOne({id: id}, {$set: {youtubeUrl: youtubeUrl}})

        return updateNameBlog.matchedCount === 1 && updateUrlBlog.matchedCount === 1
    },
    async deleteBlogById(id: string) {
        const deleteBlogId = await blogCollection.deleteOne({id:id})
        return deleteBlogId.deletedCount === 1
    },
    async deleteAllData() {
        return await blogCollection.deleteMany({})
    }
}
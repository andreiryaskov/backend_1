import {blogCollection} from "./db";
import {v1} from "uuid";

export const blogsRepositories = {
    async getAllBlogs() {
        return await blogCollection.find().toArray()
    },
    async createNewBlog(name: string, youtubeUrl: string) {

        const now = new Date();
        const createdAt = new Date(now)

        const newBlog = {
            id: v1(),
            name,
            youtubeUrl,
            createdAt: createdAt.toISOString()
        }

        return await blogCollection.insertOne(newBlog)
    },
    async getBlogById(id: string) {
        if (id) {
            return await blogCollection.findOne({id})
        }
        return
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
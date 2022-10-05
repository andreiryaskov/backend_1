import {blogCollection} from "./db";

export let blogs = [
    {
        "id": "0",
        "name": "string",
        "youtubeUrl": "https://andreiryaskov.com"
    }
]


export const blogsRepositories = {
    async getAllBlogs() {
        return await blogCollection.find().toArray()
    },
    async createNewBlog(name: string, youtubeUrl: string) {
        const now = new Date();
        const createdAt = new Date(now)
        const newBlog = {
            id: `${now}`,
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
        const updateBlog = await blogCollection.findOne({id})

        if (!updateBlog) {
            return
        } else {
            updateBlog.name = name
            updateBlog.youtubeUrl = youtubeUrl
        }
        return updateBlog
    },
    async deleteBlogById(id: string) {
        const deleteBlogId = await blogCollection.findOne({id})
        if (deleteBlogId) {
            return await blogCollection.deleteOne({id})
        } else {
            return
        }
    },
    async deleteAllData() {
        return await blogCollection.deleteMany({})
    }

}
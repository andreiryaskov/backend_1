import {blogCollection, BlogType} from "./db";
import {v1} from "uuid";




export const blogsRepositories = {
    async getAllBlogs(): Promise<unknown> {
        return await blogCollection.find().toArray()
    },
    async createNewBlog(name: string, youtubeUrl: string): Promise<BlogType> {

        const now = new Date();
        const newBlog: BlogType = {
            id: v1(),
            name,
            youtubeUrl,
            createdAt: now.toISOString()
        }

        await blogCollection.insertOne(newBlog)

        return newBlog
    },
    async getBlogById(id: string | null): Promise<unknown> {
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
        return null
        }
    },
    async updateBlogById(id: string, name: string, youtubeUrl: string): Promise<boolean> {

        const updateNameBlog = await blogCollection.updateOne({id: id}, {$set: {name: name}})
        const updateUrlBlog = await blogCollection.updateOne({id: id}, {$set: {youtubeUrl: youtubeUrl}})

        return updateNameBlog.matchedCount === 1 && updateUrlBlog.matchedCount === 1
    },
    async deleteBlogById(id: string): Promise<boolean> {
        const deleteBlogId = await blogCollection.deleteOne({id:id})
        return deleteBlogId.deletedCount === 1
    },
    async deleteAllData(): Promise<unknown> {
        return await blogCollection.deleteMany({})
    }
}
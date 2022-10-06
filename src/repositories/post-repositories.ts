import {blogCollection, postCollection} from "./db";
import {v1} from "uuid";


export const postsRepositories = {
    async getAllPosts() {
        return await postCollection.find().toArray()
    },
    async createNewPost(title: string,
                        shortDescription: string,
                        content: string,
                        blogId: string): Promise<unknown> {

        const now = new Date();
        const createdAt = new Date(now)
        // now.setDate(now.getDate() + 1)

        const newPost = {
            "id": v1(),
            title,
            shortDescription,
            content,
            blogId,
            "blogName": "some name",
            "createdAt": createdAt.toISOString()
        }
        return await postCollection.insertOne(newPost)
    },
    async getPostById(id: string): Promise<unknown | null> {
        const findPostById: unknown | null = await postCollection.findOne({id})
        if (findPostById) {
            return findPostById
        }
        return
    },
    async updatePostById(id: string,
                         title: string,
                         shortDescription: string,
                         content: string,
                         blogId: string): Promise<unknown> {
        const updateTitlePost = await blogCollection.updateOne({id: id}, {$set: {title: title}})
        const updateDescrPost = await blogCollection.updateOne({id: id}, {$set: {shortDescription: shortDescription}})
        const updateContentPost = await blogCollection.updateOne({id: id}, {$set: {content: content}})
        const updateBlogIdPost = await blogCollection.updateOne({id: id}, {$set: {blogId: blogId}})


        return updateTitlePost.matchedCount === 1
            && updateDescrPost.matchedCount === 1
            && updateContentPost.matchedCount === 1
            && updateBlogIdPost.matchedCount === 1
    },
    async deletePostById(id: string): Promise<boolean> {
        const deletePostById = await postCollection.deleteOne({id:id})
        return deletePostById.deletedCount === 1
    },
    async deleteAllData() {
        return await postCollection.deleteMany({})
    }
}
import {postCollection} from "./db";

const posts = [
    {
        "id": "string",
        "title": "string",
        "shortDescription": "string",
        "content": "string",
        "blogId": "string",
        "blogName": "string"
    }
]

export const postsRepositories = {
    async getAllPosts(){
        return  await postCollection.find().toArray()
    },


    async createNewPost(title: string,
                  shortDescription: string,
                  content: string,
                  blogId: string): Promise<unknown> {

        const now = new Date();
        const createdAt = new Date(now)
        // now.setDate(now.getDate() + 1)

        const newPost = {
            "id": now,
            title,
            shortDescription,
            content,
            blogId,
            "blogName": "some name",
            "createdAt":  createdAt.toISOString()
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
        const result = await postCollection.findOne({id})
        // return result.matchedCount === 1

        // const findUpdatePostById = posts.find(p => p.id === id)
        if (!result) {
            return
        } else {
            result.title = title
            result.shortDescription = shortDescription
            result.content = content
            result.blogId = blogId
        }
        return result
    },
    async deletePostById(id: string): Promise<boolean> {
        const result= await postCollection.deleteOne({id})
        return result.deletedCount === 1


        // const findPostIndexById = posts.findIndex(p => p.id === id)
        // if (findPostIndexById !== -1) {
        //     posts.splice(findPostIndexById, 1)
        //     return posts
        // }
        // return
    }
}
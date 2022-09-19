import {blogs} from "./blogs-repositories";

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
    getAllPosts() {
        return posts
    },
    createNewPost(title: string,
                  shortDescription: string,
                  content: string,
                  blogId: string) {

        const newPost = {
            "id": `${posts.length + 1}`,
            title,
            shortDescription,
            content,
            blogId,
            "blogName": "string"
        }

        posts.push(newPost)
        return newPost
    },
    getPostById(id: string) {
        const findPostById = posts.find(p => p.id === id)
        if (findPostById) {
            return findPostById
        }
        return
    },
    updatePostById(id: string,
                   title: string,
                   shortDescription: string,
                   content: string,
                   blogId: string) {
        const findUpdateBlogById = blogs.find(b => b.id === blogId)
        if (!findUpdateBlogById) {
            return
        } else {
            const findUpdatePostById = posts.find(p => p.id === id)
            if (findUpdatePostById) {
                findUpdatePostById.title = title
                findUpdatePostById.shortDescription = shortDescription
                findUpdatePostById.content = content
                findUpdatePostById.blogId = blogId
                return findUpdatePostById
            } else {
                return
            }
        }
    },
    deletePostById(id: string) {
        const findPostIndexById = posts.findIndex(p => p.id === id)
        if (findPostIndexById !== -1) {
            posts.splice(findPostIndexById, 1)
            return posts
        }
        return
    }
}
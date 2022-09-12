let blogs = [
    {
        "id": "string",
        "name": "string",
        "youtubeUrl": "string"
    }
]
const url = /^(https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/)?$/


const blogsRepositories = {
    getAllBlogs() {
        return blogs
    },
    createNewBlog(name: string, youtubeUrl: string) {
        const newBlog = {
            id: new Date(),
            name,
            youtubeUrl
        }
        return newBlog
    },
    createdNewBlogError(name: string, youtubeUrl: string) {
        const errorResult = {errorsMessages: <any[]>[]}
        if (!name || name.length > 15 || !name.trim()) {
            errorResult.errorsMessages.push({
                "message": "string",
                "field": "name"
            })
        }
        if (!youtubeUrl
            || youtubeUrl.length > 100
            || !youtubeUrl.trim()
            || !url) {
            errorResult.errorsMessages.push({
                "message": "string",
                "field": "youtubeUrl"
            })
        }
        if (errorResult.errorsMessages.length) {
            return errorResult
        }
        return
    }

}
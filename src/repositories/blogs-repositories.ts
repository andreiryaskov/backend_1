let blogs = [
    {
        "id": "0",
        "name": "string",
        "youtubeUrl": "https://andreiryaskov.com"
    }
]


export const blogsRepositories = {
    getAllBlogs() {
        return blogs
    },
    createNewBlog(name: string, youtubeUrl: string) {
        const newBlog = {
            id: `${blogs.length + 1}`,
            name,
            youtubeUrl
        }
        blogs.push(newBlog)
        return newBlog
    },
    getBlogById(id: string) {
        if (id) {
            return blogs.find(b => b.id === id)
        }
        return
    },
    updateBlogById(id: string, name: string, youtubeUrl: string) {
        const updateBlog = blogs.find(b => b.id === id)

        if (!updateBlog) {
            return
        } else {
            updateBlog.name = name
            updateBlog.youtubeUrl = youtubeUrl
        }
        return updateBlog
    },
    deleteBlogById(id: string) {
        const deleteBlogId = blogs.findIndex(b => b.id === id)
        if (deleteBlogId !== -1) {
            blogs.splice(deleteBlogId, 1)
            return blogs
        } else {
            return
        }
    }
}
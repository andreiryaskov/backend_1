let videos = [
    {
        "id": 0,
        "title": "string",
        "author": "string",
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": "2022-09-01T08:30:04.635Z",
        "publicationDate": "2022-09-01T08:30:04.635Z",
        "availableResolutions": [
            "P144"
        ]
    }
]
enum Resolutions {
    P144 = "P144", P240 = "P240", P360 = "P360", P480 = "P480", P720 = "P720", P1080 = "P1080", P1440 = "P1440", P2160 = "P2160"
}
const pattern = new RegExp(`^${Resolutions.P144}$|^${Resolutions.P240}$|^${Resolutions.P360}$|^${Resolutions.P480}$|^${Resolutions.P720}$|^${Resolutions.P1080}$|^${Resolutions.P1440}$|^${Resolutions.P2160}$`)

export const videosRepositories = {
    getVideoId(id: number | null) {
        if (id) {
            const findVideoId = videos.find(v => v.id === id)
            return findVideoId
        } else {
            return videos
        }
    },
    getAllVideos() {
        return videos
    },
    postVideo(title: string, author: string, availableResolutions: Resolutions[]) {

        const now = new Date();
        const createdAt = new Date(now)
        now.setDate(now.getDate() + 1)

        console.log("videos", videos)
        const newVideo = {
            "id": videos.length + 1,
            "title": title,
            "author": author,
            "canBeDownloaded": false,
            "minAgeRestriction": null,
            "createdAt": createdAt.toISOString(),
            "publicationDate": now.toISOString(),
            "availableResolutions": availableResolutions
        }
        videos.push(newVideo)
        return videos
    },
    postVideoArrayError(title: string, author: string, availableResolutions: Resolutions[]) {
        const arrayErrors = []
        if (availableResolutions) {
            const isCorrectResolation = availableResolutions.every((resolation) => pattern.test(resolation))

            if (!isCorrectResolation) {
                arrayErrors.push({
                    message: "string",
                    field: "availableResolutions"
                })
            }
        }

        if (!title
            || title.length > 40
            || typeof title !== "string"
            || !title.trim()) {
            arrayErrors.push({
                    message: "string",
                    field: "title"
                }
            )
        }

        console.log('author', author)
        if (!author || author.length > 20 || typeof author !== "string"
            || !author.trim()) {
            arrayErrors.push({
                    message: "string",
                    field: "author"
                }
            )
        }

        if (arrayErrors.length) {
            return arrayErrors
        } else {
            return null
        }
    },
    putVideo(
        id: number,
        title: string,
        author: string,
        minAgeRestriction: number,
        availableResolutions: Resolutions[],
        canBeDownloaded: boolean,
        publicationDate: string
    ) {
        const video = videos.find(v => v.id === id)
        if (video) {
            video.title = title
            video.author = author
            // @ts-ignore
            video.minAgeRestriction = minAgeRestriction
            video.canBeDownloaded = canBeDownloaded
            video.availableResolutions = availableResolutions
            video.publicationDate = publicationDate
        } else {
            return null
        }
    },
    putVideoError(
        id: number,
        title: string,
        author: string,
        minAgeRestriction: number,
        availableResolutions: Resolutions[],
        canBeDownloaded: boolean,
        publicationDate: string
    ) {
        if (typeof publicationDate !== "string") {
            return {
                errorsMessages: [
                    {
                        message: "string",
                        field: "author"
                    },
                    {
                        message: "publicationDate !== string",
                        field: "publicationDate"
                    }
                ]
            }
        }

        if (typeof canBeDownloaded !== "boolean") {
            return {
                errorsMessages: [
                    {
                        message: "string",
                        field: "title"
                    },
                    {
                        message: "canBeDownloaded !== boolean",
                        field: "canBeDownloaded"
                    }
                ]
            }
        }

        if (!availableResolutions) {
            return {
                errorsMessages: [
                    {
                        message: "string",
                        field: "title"
                    },
                    {
                        message: "string",
                        field: "availableResolutions"
                    }
                ]
            }
        }

        if (minAgeRestriction < 1 || minAgeRestriction > 18) {
            return {
                errorsMessages: [
                    {
                        message: "string",
                        field: "title"
                    },
                    {
                        message: "string",
                        field: "minAgeRestriction"
                    }
                ]
            }
        }

        if (title.length > 40
            || !title
            || typeof title !== "string"
            || !title.trim()) {
            return {
                errorsMessages: [
                    {
                        message: "string",
                        field: "title"
                    }
                ]

            }
            if (author.length > 20
                || !author
                || typeof author !== "string"
                || !author.trim()) {
                return {
                    errorsMessages: [
                        {
                            message: "string",
                            field: "title"
                        },
                        {
                            message: "string",
                            field: "author"
                        }
                    ]
                }
            }
        }
    },
    deleteVideoId(id: number) {
        const videoToDeleteIndex = videos.findIndex(v => v.id === id)
        if (videoToDeleteIndex !== -1) {
            videos.splice(videoToDeleteIndex, 1)
            return videos
        } else {
            return null
        }
    },
    deleteAllData() {
        return videos = []
    }
}

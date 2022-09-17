import {Resolutions} from "../middlewares/video-validation";

type VideosType = {
    "id": number
    "title": string
    "author": string
    "canBeDownloaded": boolean,
    "minAgeRestriction": null | number,
    "createdAt": string,
    "publicationDate": string,
    "availableResolutions": string[]
}


let videos: VideosType[] = [
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

export const videosRepositories = {
    getVideoId(id: number) {
        if (id) {
            return videos.find(v => v.id === id)
        }
        return
    },
    getAllVideos() {
        return videos
    },
    postVideo(title: string, author: string, availableResolutions: Resolutions[]) {

        const now = new Date();
        const createdAt = new Date(now)
        now.setDate(now.getDate() + 1)


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
        return newVideo
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
        if (!video) {
            return
        } else {
            video.title = title
            video.author = author
            video.minAgeRestriction = minAgeRestriction
            video.canBeDownloaded = canBeDownloaded
            video.availableResolutions = availableResolutions
            video.publicationDate = publicationDate
        }
        return video
    },
    deleteVideoId(id: number) {
        const videoToDeleteIndex = videos.findIndex(v => v.id === id)
        if (videoToDeleteIndex !== -1) {
            videos.splice(videoToDeleteIndex, 1)
            return videos
        } else {
            return null
        }
    }
    ,
    deleteAllData() {
        return []
    }
}

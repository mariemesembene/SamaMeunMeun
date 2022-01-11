export interface Comment{
    "kind": string
    "etag": string
    "id": string
    "snippet": {
        "videoId": string
        "textDisplay": string
        "textOriginal": string
        "parentId"?: string
        "authorDisplayName": string
        "authorProfileImageUrl": string
        "authorChannelUrl": string
        "authorChannelId": {
            "value": string
        },
        "canRate": boolean
        "viewerRating": string
        "likeCount": number
        "publishedAt": string
        "updatedAt": string
    }
}
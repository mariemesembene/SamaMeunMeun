
import { Comment } from "./Comment";
import { Statistic } from "./Statistic";

export interface Video{
    "kind": string,
        "etag": string,
        "isUserLiked"?: string;
        "id": {
            "kind": string,
            "videoId": string
        },
        "snippet": {
            "publishedAt": string,
            "channelId": string,
            "title": string,
            "description": string,
            "thumbnails": {
                "default": {
                    "url": string,
                    "width": number,
                    "height": number
                },
                "medium": {
                    "url": string,
                    "width": number,
                    "height": number
                },
                "high": {
                    "url": string,
                    "width": number,
                    "height": number
                }
            },
            "channelTitle": string,
            "liveBroadcastContent": string,
            "publishTime": string,
        }
        "commentaires"?: {
            "kind": string,
            "etag": string,
            "pageInfo": {
                "totalResults": number,
                "resultsPerPage": number
            },
            "items": Comment[]
        }
        "statistics"?:Statistic
}
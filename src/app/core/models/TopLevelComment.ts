
import { FormControl } from "@angular/forms";

export interface TopLevelComment{
        "kind": string
        "etag": string
        "id": string
        "snippet": {
            "videoId": string
            "topLevelComment": Comment
            "canReply": boolean
            "totalReplyCount": number
            "isPublic": boolean
        }
        "replies": {
            "comments": Comment[]
        },
        'isShownReplyInput'?:boolean
        'control'?: FormControl
}
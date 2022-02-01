import { Publication } from "./Publication";
import { Reply } from "./Reply";
import { User } from "./User";

export interface likeComment
{
    "id": number
    "comment"?: Comment
    "reply"?: Reply
}
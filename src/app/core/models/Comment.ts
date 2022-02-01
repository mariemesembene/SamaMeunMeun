import { Publication } from "./Publication";
import { Reply } from "./Reply";
import { User } from "./User";

export interface Comment{
    "id": number
    "user": User
    "video": Publication
    "displayText": string,
    "replies": Reply[]

}
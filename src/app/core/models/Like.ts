import { Publication } from "./Publication";
import { User } from "./User";

export interface Like
{
    "id": number
    "video"?: Publication
    "user": User
    "rate"?: string
}
import { User } from "./User";

export interface Reply{
    "id": number
    "comment": Comment,
    "display_text": string
    "user": User
}
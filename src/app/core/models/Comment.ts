export interface Comment{
    "id": string,
    "libelle": string,
    // sub-comment-id: contient l'id du commnetaire parent si le commentaire
    // actuel est un sous commentaire(reply), cette attribut est nullable
    "parent-comment-id"?: number,
    // l'id de l'utilisateur qui a posté le commentaire
    "user-id": number
}
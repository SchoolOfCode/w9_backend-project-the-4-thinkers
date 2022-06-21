import query from "../db/index.js"

export async function getAllComments(){
    let allComments = await query(`SELECT * FROM comments`)
    return allComments.rows;
};
export async function createComment(newComment) {
    let createCommentSQL = `INSERT INTO comments (user_id, comment_text,page_id) VALUES ($1,$2,$3) RETURNING *;`;
    let addedComment = await query (createCommentSQL, [newComment.user_id,newComment.comment_text,1]);
    return addedComment;
//To scale - use the /pagenumber as the pageID param in the query
}
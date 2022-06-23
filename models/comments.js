import query from "../db/index.js"

export async function getAllComments(){
    let allComments = await query(`SELECT * FROM comments`)
    return allComments.rows;
};
export async function createComment(newComment){
    let createCommentSQL = `INSERT INTO comments (user_id, comment_text,page_id) VALUES ($1,$2,$3) RETURNING *;`;
    let addedComment = await query (createCommentSQL, [newComment.user_id,newComment.comment_text,1]);
    return addedComment;
//To scale - use the /pagenumber as the pageID param in the query
}
export async function deleteComment(commentId){
    let deleteCommentSQL = `DELETE FROM comments WHERE comments_id = $1 RETURNING *;`;
    let deletedComment = await query (deleteCommentSQL, [commentId]);
    return deletedComment;
}
export async function editComment (commentId,newCommentText){
    let editCommentSQL = `UPDATE comments SET comment_text = $1 WHERE comments_id = $2 RETURNING *;`;
    let editedComment = await query (editCommentSQL,[newCommentText,commentId]);
    return editedComment;
}

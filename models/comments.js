import query from "../db/index.js"

export async function getAllComments(){
    let allComments = await query(`SELECT * FROM comments`)
    //console.log(allComments)
    return allComments.rows;
};
export async function createComment(newComment) {
    let addedComment= await query (`INSERT INTO comments (user_id, comment_text) VALUES ($1,$2) RETURNING *;`, [newComment.userId,newComment.text]);
  //  console.log(newComment);
    return addedComment;
//To scale - use the /pagenumber as the pageID param in the query
}
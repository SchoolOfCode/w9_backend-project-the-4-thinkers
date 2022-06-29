
import query from "../index.js"
import testcomments from "../../libs/libs.js"

async function populateCommentsTable(){
    for (let i=0; i<testcomments.length; i++){
        const res =  await query(`INSERT INTO comments (user_id, comment_text, page_id) 
        VALUES ($1,$2,$3) RETURNING *;`, 
        [testcomments[i].user_id,testcomments[i].comment_text,testcomments[i].page_id]);
        console.log(res.command, "populated comments table");
    } 
}
populateCommentsTable();

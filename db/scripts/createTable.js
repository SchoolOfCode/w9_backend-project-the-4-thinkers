
import query from "../index.js"

const sqlString = `CREATE TABLE IF NOT EXISTS comments (
    comments_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT, comment_text TEXT, page_id INT);`
   async function createCommentsTable(){
       console.log("help")
       const res = await query(sqlString);
       console.log(res.command, "created comments table");
   }
   createCommentsTable();



 import query from "../index.js"

 const sqlString = `DROP TABLE IF EXISTS comments;`;

 async function createCommentsTable(){
     const res = await query(sqlString);
     console.log(res.command, "dropped comments table");
 }
 createCommentsTable();


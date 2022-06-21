import query from "../db/index.js"

export async function getAllComments(){
    let allComments = await query(`SELECT * FROM comments`)
    console.log(allComments)
    return allComments
}

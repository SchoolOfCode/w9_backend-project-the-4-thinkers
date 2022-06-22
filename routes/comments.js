import express from "express";
import { getAllComments,createComment } from "../models/comments.js";
const commentsRouter = express.Router()


commentsRouter.get("/1", async function(req, res){
    let data = await getAllComments()
    /* const responseObject = {
        success:true,
        message:"reached page 1",
        payload:data,
    };
    console.log(responseObject); */
    res.json(data);
})
commentsRouter.post("/1", async function(req, res){
    let newComment = req.body;
    let data = await createComment(newComment)
    const responseObject = {
        success:true,
        message:"reached page 1",
        payload:data,
    };
    //console.log(responseObject);
    res.json(responseObject);
})

export default commentsRouter;

//maybe async it
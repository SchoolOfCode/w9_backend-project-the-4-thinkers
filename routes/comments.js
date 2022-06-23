import express from "express";
import { getAllComments,createComment, deleteComment, editComment } from "../models/comments.js";
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
        message:"Comment created",
        payload:data,
    };
    //console.log(responseObject);
    res.json(responseObject);
})
commentsRouter.delete("/1", async function (req,res){
    let commentToBeDeleted = req.body.comment_id
    let data = await deleteComment(commentToBeDeleted)
    const responseObject = {
        success:true,
        message:"Comment deleted",
        payload:data,
    };
    //console.log(responseObject);
    res.json(responseObject);
})
commentsRouter.patch("/1", async function (req,res){
    let commentToBeEdited = req.body.comment_id;
    let newCommentText = req.body.comment_text;
    let data = await editComment(commentToBeEdited,newCommentText);
    const responseObject = {
        success:true,
        message:"Comment edited",
        payload: data,
    };
    res.json(responseObject);
})



export default commentsRouter;

//maybe async it
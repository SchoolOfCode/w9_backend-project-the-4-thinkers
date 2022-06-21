import express from "express";
import { getAllComments } from "../models/comments.js";
const commentsRouter = express.Router()


commentsRouter.get("/1", async function(req, res){
    const responseObject = {
        success:true,
        message:"reached page 1",
        payload: await getAllComments(),
    };
    console.log(responseObject);
    res.json(responseObject);
})

export default commentsRouter;

//maybe async it
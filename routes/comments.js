import express from "express";
import { getAllComments } from "../models/comments";
const router = express.Router()


router.get("/1", function(req, res){
    const responseObject = {
        success:true,
        message:"reached page 1",
        data: getAllComments(),
    };
    res.json(responseObject)
})

export default router

//maybe async it
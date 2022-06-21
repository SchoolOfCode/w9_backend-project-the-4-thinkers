import express from "express";
const app = express()
const port = 3000;
import { commentsRouter } from "./routes/comments.js"

app.use("/page", commentsRouter)

export default app;
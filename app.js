import express from "express";
const app = express()
const port = 3000;
const commentsRouter = require("./routes/comments.js")

app.use("/page/", commentsRouter)

export default app;
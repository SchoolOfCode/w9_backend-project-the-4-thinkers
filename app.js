import express from "express";
const app = express()
const port = 3000;
import commentsRouter from "./routes/comments.js"

app.use("/page", commentsRouter)
app.listen(port, function(){console.log(`listening on port ${port}`)});
export default app;
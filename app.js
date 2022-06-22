import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
const port = 3000;
import commentsRouter from "./routes/comments.js"
app.use(cors());
app.use("/page", commentsRouter)
app.listen(port, function(){
    console.log(`listening on port ${port}`)
    });
export default app;
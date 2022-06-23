import express from "express";
import logger from "morgan";
import cors from "cors";
import commentsRouter from "./routes/comments.js"
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use("/page", commentsRouter)
app.listen(port, function(){
    console.log(`listening on port ${port}`)
    });
export default app;
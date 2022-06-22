import express from "express";
import cors from "cors";
import commentsRouter from "./routes/comments.js"
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(function (req,res,next) {
    console.log(" request sent to:",req.path);
    next();
  });
app.use("/page", commentsRouter)
app.listen(port, function(){
    console.log(`listening on port ${port}`)
    });
export default app;
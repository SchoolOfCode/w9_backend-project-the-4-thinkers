# Startup Scripts

To run these scripts, use: 
```bash
npm run db:'scriptFilename'
```
e.g. 
```bash
npm run db:populateTable
```
---
## createTable script
```js
import query from "../index.js"

const sqlString = `CREATE TABLE IF NOT EXISTS comments (comments_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,user_id INT, comment_text TEXT, page_id INT);`
async function createCommentsTable(){
    const res = await query(sqlString);
    console.log(res.command, "created comments table");
}
createCommentsTable();
```
### Description:
When this script is run, it will create an SQL table for storing comments in the connected database.
<br>The table will be created with 4 columns:
+ comments_id - A unique number with which to select a single comment.
+ user_id - A number corresponding to the author of the comment.
+ comment_text - The user-inputted text portion of the comment.
+ page_id - A number corresponding to the page the comment was posted on.
---
## populateTable script

```js
import query from "../index.js"
import testcomments from "../../libs/libs.js"

    async function populateCommentsTable(){
        for (let i=0; i<testcomments.length; i++){
            const res =  await query(`INSERT INTO comments (user_id, comment_text, page_id) VALUES ($1,$2,$3) RETURNING *;`, 
            [testcomments[i].user_id,testcomments[i].comment_text,testcomments[i].page_id]);
            console.log(res.command, "populated comments table");
        } 
    }
populateCommentsTable();
```
### Description:

When this script is run, it will populate the table created with the createTable script above with some pre-made comments for testing the display.<br>
These comments will be imported from the file libs.js and will take the form of an array named "_testcomments_" containing each comment as an object, with 3 key value pairs for each object:
+ user_id
+ comment_text
+ page_id
<br>

Note: The key  "_comments_id_" is not needed, since this unique number is generated for each new entry automatically by the table.

---
## dropTable script
```js
import query from "../index.js"

const sqlString = `DROP TABLE IF EXISTS comments;`;
async function createCommentsTable(){
    const res = await query(sqlString);
    console.log(res.command, "dropped comments table");
}
createCommentsTable();
```
### Description:
When this script is run, it will delete the SQL table of comments in the connected database. 


# Environment Variables

To run this project, you will need to add the following environment variables to your .env file from your database credential page:

```js
PGHOST=' '
PGDATABASE=' '
PGUSER=' '
PGPORT=' '
PGPASSWORD=' '
```


# Index.js
```js
import pg from "pg";

const pool = new pg.Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: { rejectUnauthorized: false}
});

function query(text, params, callback) {
    return pool.query(text, params, callback);
};
export default query;
```
### Description:
This file configures a new pool to connect to the database with, using the credentials from the .env file. The pool created has a _query_ method attached to it to allow for the functions in _models_ to make database queries directly, using SQL language, which is inserted as the 1st parameter of the function.


# Routes
Below are our functions that build a REST API with CRUD operators:

## Function: commentsRouter.get 
```js
    commentsRouter.get("/1", async function(req, res){
    let data = await getAllComments()
    res.json(data);})
```
### Description:
This route handles the client requests that come into the path 'users/1'.
It awaits the getAllComments function from models file which selects all the comments
from our comments table
### Parameters:
None
### Returns:
A json file with all of our user's comments data as an array of individual comment objects. 

## Function: commentsRouter.post
```js
    commentsRouter.post("/1", async function(req, res){
    let newComment = req.body;
    let data = await createComment(newComment)
    const responseObject = {
        success:true,
        message:"Comment created",
        payload:data,
    };
    res.json(responseObject);})
```
### Description:
This route handles the clients post requests that come into the path
'users/1'.  
### Parameter:
The createComment function imported from models file takes in the parameter newComment.
This variable links to the req.body object.  
### Return:
This function returns a json file with the new comment created by user, 
with the corresponding responseObject that confirms a comment has been created.

## Function: commentsRouter.delete
```js
    commentsRouter.delete("/1", async function (req,res){
    let commentToBeDeleted = req.body.comment_id
    let data = await deleteComment(commentToBeDeleted)
    const responseObject = {
        success:true,
        message:"Comment deleted",
        payload:data,
    };
    res.json(responseObject);})
```
### Description:

This route handles the delete requests taken that come into 
the path "/users/1"

### Parameters:

This deleteComment function imported from models file takes in a 
parameter called commentToBeDeleted. This variable identifies the comment_id from req.body object.


### Return:

This function returns a json file with the comment that will be deleted,
with the corresponding responseObject that confirms comment deleted.


# Models
The models files serve as a library of functions to carry out database queries when a request comes in on a given route. Each function will be imported and called on in the corresponding routes file, where a return will be generated and returned as part of the "**Response Object**".

<br>

## Getting all comments:
```js
export async function getAllComments(){
    let allComments = await query(`SELECT * FROM comments`)
    return allComments.rows;
};
```
### Description:
When called, this function queries the database for all of the comments.
### Parameters:
None, the function simply selects all of the comments in the respective table.
### Returns:
All of the comments as an array of objects. Each object has the key-value pairs of _user_id_, _comment_text_, _comment_id_ & _page_id_.

<br>

## Creating a comment:
```js
export async function createComment(newComment){
    let createCommentSQL = `INSERT INTO comments (user_id, comment_text,page_id) VALUES ($1,$2,$3) RETURNING *;`;
    let addedComment = await query (createCommentSQL, [newComment.user_id,newComment.comment_text,1]);
    return addedComment;
};
```
### Description:
When called, this function adds the inputted comment as a new row in the database table.
### Parameters: 
_newComment_ - An object, with key-values: 
+ _user_id_: The ID corresponding to the user making the comment.
+ _comment_text_: The text content of the submitted comment.
+ _page_id_: The ID corresponding to the page the comment was submitted from.
### Returns:
The comment that was added, as an object, with the same key-values, plus the key _comment_id_, which is a primary key & identity, that the newly created comment was assigned.

<br>

## Deleting a comment:
```js
export async function deleteComment(commentId){
    let deleteCommentSQL = `DELETE FROM comments WHERE comments_id = $1 RETURNING *;`;
    let deletedComment = await query (deleteCommentSQL, [commentId]);
    return deletedComment;
}
```
### Description:
When called, this function deletes the selected comment from the database table.
### Parameters: 
_comment_id_ - The unique id corresponding to the comment to be deleted.
### Returns: 
A payload that confirms the deletion of the corresponding entry. 


# Tests:

## GET request test:
```js
test("Check that the array returned has the correct object items", async function getAllComments() {
        await new Promise((resolve) => setTimeout(() => resolve(), 2000));
        const response = await request(app)
            .get("/page/1")
            .set("Accept", "application/json");
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    comments_id: expect.any(Number),
                    user_id: expect.any(Number),
                    comment_text: expect.any(String),
                    page_id: expect.any(Number),
                }),
            ])
        );
    });
```
### Description:
This test checks the functionality of the GET request, ensuring that a GET request to __localhost:3000/page/1__ returns an array of comment objects, with correct key-value pairs.

<br>

## POST request test:
```js
test("Check that the comment_text has a string", async function createComment (){
        await new Promise((resolve) => setTimeout(() => resolve(), 2000));
        const testUserId = 27;
        const testCommentText = "This is a comment.";
        const response = await request(app)
            .post("/page/1")
            .set("Accept", "application/json")
            .send({
                comment_text: testCommentText,
                user_id: testUserId
            })
        expect(response.body.payload.rows[0]).toMatchObject({
            comments_id: expect.any(Number),
            user_id: testUserId,
            comment_text: testCommentText,
            page_id: expect.any(Number)
        });
}); 
```
### Description:
This test checks the functionality of the POST request, ensuring that a POST request to __localhost:3000/page/1__ returns a comment object, with correct key-value pairs, including the _comment_text_ key which has the value of the submitted comment.

<br>


## DELETE request test:
```js
describe("DELETE comment with specific ID", function () {
    test("Check whether a comment is deleted at all", async function () {
        await new Promise((resolve) => setTimeout(() => resolve(), 2000));
        const response = await request(app)
            .delete("/page/1")
            .set("Accept", "application/json")
            .send({commentId:20});
        expect(response.statusCode).toBe(200);
        expect(response.body.payload.command).toBe("DELETE");
    });
    test("Check whether an empty array is returned when deleting", async function () {
        await new Promise((resolve) => setTimeout(() => resolve(), 2000));
        const response = await request(app)
            .delete("/page/1")
            .set("Accept", "application/json")
            .send({commentId:20});
        expect(response.body.payload.rows).toStrictEqual([]);
    });
});
```
### Description:
These tests check the functionality of the DELETE request, ensuring that a DELETE request to __localhost:3000/page/1__ returns a response object showing that the delete request was sucessfully received, and that selecting the comment with the commentId that was deleted returns an empty array (since that comment object no longer exists).
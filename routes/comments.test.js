import { test, expect, describe } from "@jest/globals";
import request from "supertest";
import app from "../app.js";


// TEST the get all comments function

describe("GET all comments", function () {
    test("Check whether we receive 200 status code", async function getAllComments() {
        await new Promise((resolve) => setTimeout(() => resolve(), 2000));
        const response = await request(app)
            .get("/page/1")
            .set("Accept", "application/json");
        expect(response.statusCode).toBe(200);
        console.log(response.statusCode);
    });
    test("Check whether an object is returned", async function getAllComments() {
        await new Promise((resolve) => setTimeout(() => resolve(), 2000));
        const response = await request(app)
            .get("/page/1")
            .set("Accept", "application/json");
        expect(response.body).toMatchObject({});
    });
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
});

// afterAll(async () => {
//     await pool.end();
// });

// TEST the post comments function

describe("POST new comments", function () {
    test("Check whether new comment is added to database", async function createComment() {
        await new Promise((resolve) => setTimeout(() => resolve(), 2000));
        const response = await request(app)
            .post("/page/1")
            .set("Accept", "application/json")
            .send({comment_text: "test comment"})
            expect(response.body).toMatchObject({
                success: true,
                message: expect.any(String),
                payload: expect.any(Object),
            });
    });
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
});

// TEST the delete comments function

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

import { test, expect, describe } from "@jest/globals";
import request from "supertest";
import app from "../app.js";
import commentsRouter from "./comments";
import {
    getAllComments,
    createComment,
    deleteComment,
} from "../models/comments";

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

// TASK 3.6.4 Add a new user to database

// describe("POST new user", function () {
//   test("check whether new user is added to DB", async function createUser() {
//     const response = await request(app).get("/users");
//     expect(response.statusCode).toBe(200);
//     console.log(response.statusCode);
//     expect(response.body).toMatchObject({
//       success: true,
//       payload: expect.any(Array),
//     });
//     // console.log(response.body);

//     expect(response.body.payload).toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({
//           id: expect.any(Number),
//           username: "Kal",
//         }),
//       ])
//     );
//     console.log(response.body.payload);
//   });
// });

// // TASK 3.6.5 DELETE user from database

// describe("DELETE user with specific ID", function () {
//   test("check whether user with specific ID is deleted", async function deleteUserById() {
//     const response = await request(app).get("/users/204");
//     expect(response.statusCode).toBe(404);
//     console.log(response.statusCode);
//     console.log(response.text);
//   });
// });

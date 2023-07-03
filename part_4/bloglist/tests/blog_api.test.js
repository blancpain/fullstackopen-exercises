const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObj = new Blog(helper.initialBlogs[0]);
  await blogObj.save();
  blogObj = new Blog(helper.initialBlogs[1]);
  await blogObj.save();
});

describe("when there are initially some saved blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all notes are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("a specific author is correctly found", async () => {
    const response = await api.get("/api/blogs");
    const author = response.body.map((r) => r.author);
    expect(author).toContain("Michael Chan");
  });

  test("blog posts have an 'id' property", async () => {
    const response = await api.get("/api/blogs");
    const blogOne = response.body[0];
    expect(blogOne.id).toBeDefined();
  });
});

describe("when adding a blog", () => {
  test("it can be added correctly", async () => {
    const newBLog = {
      _id: "5a422ba71b54a676234d17fb",
      title: "Testing rocks",
      author: "Yasen Dimitrov",
      url: "https://www.someURL.com",
      likes: 50,
      __v: 0,
    };

    await api

      .post("/api/blogs")
      .send(newBLog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const updatedBlogs = await helper.blongsInDb();
    expect(updatedBlogs).toHaveLength(helper.initialBlogs.length + 1);
    const contents = updatedBlogs.map((r) => r.title);
    expect(contents).toContain("Testing rocks");
  });

  test("likes default to 0 if not provided", async () => {
    const newBlog = {
      _id: "5a422ba71b54a676234d17fb",
      title: "Testing rocks",
      author: "Yasen Dimitrov",
      url: "https://www.someURL.com",
      __v: 0,
    };

    await api.post("/api/blogs").send(newBlog);
    const response = await api.get("/api/blogs");
    const addedBlog = response.body[2];

    expect(addedBlog.likes).toBe(0);
  });

  test("backend responds with status 400 bad request if blog is created without URL", async () => {
    const newBlog = {
      _id: "5a422ba71b54a676234d17fb",
      title: "Testing rocks",
      author: "Yasen Dimitrov",
      __v: 0,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("backend responds with status 400 bad request if blog is created without title", async () => {
    const newBlog = {
      _id: "5a422ba71b54a676234d17fb",
      url: "https://www.someURL.com",
      author: "Yasen Dimitrov",
      __v: 0,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if 'id' is valid", async () => {
    const blogsAtStart = await helper.blongsInDb();
    const blogToBeDeleted = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToBeDeleted.id}`).expect(204);
    const blogsAtEnd = await helper.blongsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  });
});

describe("updating a blog", () => {
  test("works for updating likes", async () => {
    const newBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",

      likes: 65,
    };

    await api.put("/api/blogs/5a422aa71b54a676234d17f8").send(newBlog);
    const response = await api.get("/api/blogs/");
    expect(response.body[1].likes).toBe(65);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!body.url) {
    response.status(400).json({ error: "url missing" });
  } else if (!body.title) {
    response.status(400).json({ error: "title missing" });
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
    });

    const savedBlog = await blog.save();

    user.blogs = [...user.blogs, savedBlog._id];
    await user.save();
    response.status(201).json(savedBlog);
  }
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blogToBeDeleted = await Blog.findById(request.params.id);

    if (!blogToBeDeleted) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (user.id.toString() === blogToBeDeleted.user.toString()) {
      await Blog.deleteOne(blogToBeDeleted);
      response.status(204).end();
    } else {
      response.status(401).json({ error: "invalid user" });
    }
  }
);

blogsRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  // check if blog exists first
  const targetedBlog = await Blog.findById(request.params.id);

  if (!targetedBlog) {
    return response.status(404).json({ error: "blog not found" });
  }

  if (!body.url) {
    response.status(400).json({ error: "url missing" });
  } else if (!body.title) {
    response.status(400).json({ error: "title missing" });
  } else {
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
    };

    const blogToBeUpdated = await Blog.findByIdAndUpdate(
      request.params.id,
      blog,
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    response.json(blogToBeUpdated);
  }
});

module.exports = blogsRouter;

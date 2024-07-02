import Post from "../models/post.modal.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  console.log(req.user.isAdmin);
  if (!req.user.isAdmin)
    return next(errorHandler(403, "You are not allowed to create a post"));

  if (!req.body.title || !req.body.content)
    return next(errorHandler(400, "Title and content are required"));

  const slug = req.body.title
    .toLowerCase()
    .split(" ")
    .join("-")
    .replace(/[^a-zA-Z0-9-]/g, "-");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savePost = await newPost.save();
    res.status(201).json(savePost);
  } catch (error) {
    next(error);
  }
};
export const getposts = async (req, res, next) => {
  console.log(1);
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    // Construct the query object
    const query = {};
    if (req.query.userId) query.userId = req.query.userId;
    if (req.query.category) query.categories = { $in: [req.query.category] };
    if (req.query.slug) query.slug = req.query.slug;
    if (req.query.postId) query._id = { $in: [req.query.postId] };
    if (req.query.searchTerm) {
      query.$or = [
        { title: { $regex: req.query.searchTerm, $options: "i" } },
        { content: { $regex: req.query.searchTerm, $options: "i" } },
      ];
    }

    console.log("Query object:", query);

    // Fetch posts with the constructed query
    const posts = await Post.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    // Fetch total post count and posts updated in the last month
    const totalPosts = await Post.countDocuments(query); // Count only documents matching the query

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const postsInLastMonth = await Post.countDocuments({
      updatedAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({ posts, totalPosts, postsInLastMonth });
  } catch (error) {
    next(error);
  }
};

export const deletepost = async (req, res, next) => {
  console.log(req.params);
  if (!req.user.isAdmin || req.user.id !== req.params.userId)
    return next(errorHandler(403, "You are not allowed to delete a post"));

  try {
    const post = await Post.findOneAndDelete(req.params.postId);

    if (!post) return next(errorHandler(404, "Post not found"));

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

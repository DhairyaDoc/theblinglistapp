const { Blog } = require("../models/Blog");
exports.addBlog = async (req, res) => {
  try {
    const { blogTitle, blogDescription, userID } = req.body;
    if (blogTitle || blogDescription || userID) {
      const blog = new Blog({
        blogTitle: blogTitle,
        blogDescription: blogDescription,
        postedBy: userID,
      });
      await blog
        .save()
        .then((result) => {
          return res
            .status(200)
            .json({ success: true, message: "Blog Added Successfully" });
        })
        .catch((err) => {
          return res
            .status(502)
            .json({ error: "Could not add the blog!", err });
        });
    } else {
      return res.status(502).json({ error: "Please add all the fields!" });
    }
  } catch (error) {
    return res.status(502).json({ error: "Something went wrong!" });
  }
};
exports.getAllBogs = async (req, res) => {
  try {
    return await Blog.find()
      .populate("postedBy")
      .then((docs) => {
        return res.status(200).json({ data: docs });
      })
      .catch((err) => {
        return res.status(502).json({ error: "Cannot get all blogs!" });
      });
  } catch (error) {
    return res.status(502).json({ error: "Something went wrong!" });
  }
};
exports.getBlogsByID = async (req, res) => {
  const { id } = req.params;
  return await Blog.find({ postedBy: id })
    .populate("postedBy")
    .then((docs) => {
      return res.status(200).json({ data: docs });
    })
    .catch(() => {
      return res.status(502).json({ error: "Something went wrong!" });
    });
};
exports.deleteBlog = async (req, res) => {
  try {
    const { blogID } = req.body;
    Blog.findByIdAndDelete(blogID, (err, docs) => {
      if (err) {
        return res
          .status(502)
          .json({ success: false, message: "Cannot delete blog!" });
      }
      return res
        .status(200)
        .json({ success: true, message: "Blog Deleted Successfully!" });
    });
  } catch (error) {
    return res.status(502).json({ error: "Something went wrong!" });
  }
};
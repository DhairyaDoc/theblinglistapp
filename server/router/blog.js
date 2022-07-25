const router = require("express").Router();
const {
  addBlog,
  getAllBogs,
  getBlogsByID,
  deleteBlog,
} = require("../controllers/blogController");
router.post("/addBlog", addBlog);
router.get("/getAllBlogs", getAllBogs);
router.get("/getUserBlog/:id", getBlogsByID);
router.delete("/deleteBlog", deleteBlog);
module.exports = router;
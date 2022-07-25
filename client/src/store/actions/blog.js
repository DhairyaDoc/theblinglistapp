import { BlogService } from "../../services/BlogService";
export const addUserBlog = (params) => {
  return BlogService.addBlog(params).then((response) => {
    return response;
  });
};
export const getAllUserBlogs = () => {
  return BlogService.getAllBlogs().then((response) => {
    return response;
  });
};
export const getUserBlogByID = (params) => {
  return BlogService.getUserBlog().then((response) => {
    return response;
  });
};
export const deleteUserBlog = (id) => {
  return BlogService.deleteBlog(id).then((response) => {
    return response;
  });
};
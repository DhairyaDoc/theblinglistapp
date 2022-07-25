import { BACKEND_URL } from "../config/config";
const BlogService = {
  addBlog: (params) => {
    return fetch(BACKEND_URL + "blogs/addBlog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },
  getAllBlogs: () => {
    return fetch(BACKEND_URL + "blogs/getAllBlogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },
  getUserBlog: () => {
    const userID = JSON.parse(localStorage.getItem("user"))._id;
    return fetch(BACKEND_URL + `blogs/getUserBlog/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },
  deleteBlog: (id) => {
    return fetch(BACKEND_URL + `blogs/deleteBlog`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogID: id,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        return response;
      });
  },
};
export { BlogService };
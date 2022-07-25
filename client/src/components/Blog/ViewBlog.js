/***
 * @author : Guryash Singh Dhall
 * @bannerID : B00910690
 * @email : guryash.dhall@dal.ca
 ***/

 import React, { useEffect, useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
 import { deepPurple } from "@mui/material/colors";
 import moment from "moment";
 import "./Blogs.css";
 import { isUserLoggedIn } from "../../Helpers/helper";
 import { getAllUserBlogs } from "../../store/actions/blog";
 const ViewBlog = () => {
   const navigate = useNavigate();
   const [blogs, setBlogs] = useState([]);
   useEffect(() => {
     let role = localStorage.getItem("role");
     if (isUserLoggedIn()) {
       if (role === "customer") {
         getAllUserBlogs().then((response) => {
           setBlogs(response.data);
         });
       } else if (role === "admin") {
         navigate("/admin");
       }
     } else {
       navigate("/");
     }
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
     <>
       <Grid container>
         <Grid xs={12}>
           <Typography
             variant="h4"
             gutterBottom
             component="div"
             className="blog-heading"
             alignItems="center"
             justifyContent={"center"}
           >
             Bling Stories and Blogs
             <Button
               variant="outlined"
               color="secondary"
               sx={{ marginLeft: "2%" }}
               onClick={() => navigate("/addBlog")}
             >
               Add a Blog
             </Button>
             <Button
               variant="outlined"
               color="secondary"
               sx={{ marginLeft: "1%" }}
               onClick={() => navigate("/myBlog")}
             >
               My Blogs
             </Button>
           </Typography>
         </Grid>
         {blogs.length > 0 ? (
           blogs.map((blog) => {
             return (
               <Grid xs={12} align="center" mb={3}>
                 <Paper
                   elevation={24}
                   sx={{ width: "90%", textAlign: "left", padding: "30px" }}
                 >
                   <div
                     style={{
                       display: "flex",
                       alignItems: "center",
                       marginBottom: "1%",
                     }}
                   >
                     <Avatar
                       alt={blog.postedBy.firstName}
                       src={blog.postedBy.firstName}
                       sx={{ bgcolor: deepPurple[500] }}
                     />
                     <div>
                       <Typography
                         variant="h5"
                         gutterBottom
                         component="div"
                         className="blog-text"
                         style={{ marginLeft: "12px", marginTop: "8px" }}
                       >
                         <span className="blog-title">
                           {blog.postedBy.firstName} {blog.postedBy.lastName}
                         </span>
                       </Typography>
                     </div>
                   </div>
                   <span style={{ color: "#888" }}>
                     <b>Posted On: </b>
                     <span>
                       {moment(
                         new Date(blog.createdAt)
                           .toISOString()
                           .replace(/T/, " ")
                           .replace(/\..+/, "")
                       ).format("MMMM DD, YYYY")}
                     </span>
                   </span>
                   <Typography
                     variant="h5"
                     gutterBottom
                     component="div"
                     className="blog-text"
                     mt={2}
                     ml={1}
                   >
                     <span className="blog-title">{blog.blogTitle}</span>
                   </Typography>
                   <Typography
                     mt={1}
                     ml={1}
                     variant="p"
                     gutterBottom
                     component="div"
                   >
                     {blog.blogDescription}
                   </Typography>
                 </Paper>
               </Grid>
             );
           })
         ) : (
           <h1>No Blogs Found</h1>
         )}
       </Grid>
     </>
   );
 };
 export default ViewBlog;
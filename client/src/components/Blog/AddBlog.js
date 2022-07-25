/***
 * @author : Guryash Singh Dhall
 * @bannerID : B00910690
 * @email : guryash.dhall@dal.ca
 ***/
 import React, { useState } from "react";
 import { Grid, Button, Typography, Paper, TextField } from "@mui/material";
 import { useNavigate } from "react-router-dom";
 import { addUserBlog } from "../../store/actions/blog";
 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
 const AddBlog = () => {
   const navigate = useNavigate();
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const clearForm = () => {
     setTitle("");
     setDescription("");
   };
   const handleSubmit = (event) => {
     event.preventDefault();
     const userID = JSON.parse(localStorage.getItem("user"))._id;
     if (title === "" || description === "") {
       toast.error("Add all the fields", {
         position: "bottom-right",
         theme: "dark",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
       });
     } else {
       addUserBlog({
         blogTitle: title,
         blogDescription: description,
         userID: userID,
       }).then((response) => {
         if (response.success) {
           clearForm();
           toast.success(response.message, {
             position: "bottom-right",
             theme: "dark",
             autoClose: 1000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             onClose: () => {
               navigate("/blogs");
             },
           });
         }
       });
     }
   };
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
             Write a Blog
             <Button
               variant="outlined"
               color="secondary"
               sx={{ marginLeft: "2%" }}
               onClick={() => navigate("/blogs")}
             >
               BACK
             </Button>
           </Typography>
         </Grid>
         <Grid xs={12} align="center" mb={3}>
           <Paper
             elevation={24}
             sx={{ width: "90%", textAlign: "left", padding: "30px" }}
           >
             <Grid xs={12} align="center">
               <TextField
                 label="Title"
                 placeholder="Add title..."
                 variant="outlined"
                 fullWidth
                 sx={{ marginBottom: "2%" }}
                 value={title}
                 onChange={(event) => {
                   setTitle(event.target.value);
                 }}
               />
               <TextField
                 id="outlined-multiline-static"
                 label="Description"
                 multiline
                 rows={10}
                 placeholder="Add description..."
                 fullWidth
                 sx={{ marginBottom: "2%" }}
                 value={description}
                 onChange={(event) => {
                   setDescription(event.target.value);
                 }}
               />
               <Button
                 variant="outlined"
                 size="large"
                 color="secondary"
                 onClick={handleSubmit}
               >
                 Add Blog
               </Button>
             </Grid>
           </Paper>
         </Grid>
         <ToastContainer />
       </Grid>
     </>
   );
 };
 export default AddBlog;
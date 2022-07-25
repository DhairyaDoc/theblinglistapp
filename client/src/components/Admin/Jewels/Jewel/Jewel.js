/***
 * @author : Aayushi Rashesh Gandhi
 * @bannerID : B00890697
 * @email : aayushi.gandhi@dal.ca
 ***/

import React, { useState } from "react";
import useStyles from "./Styles.js";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { deleteProduct } from "../../../../store/actions/admin.js";
import { useNavigate } from "react-router-dom";

const Jewel = ({ jewel, setCurrentProductId, getPro}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const role = localStorage.getItem("role");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteProduct(jewel._id).then((result) => {
      if (result.success === true) {
        setOpen(false);
        getPro()

        toast.success("Product deleted successfully!", {
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
        setOpen(false);

        toast.error("Product cannot be deleted. Please try again!", {
          position: "bottom-right",
          theme: "dark",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  const handleEdit = () => {
    setCurrentProductId(jewel._id);
    toast.success("Please edit the product from the form above.", {
      position: "bottom-right",
      theme: "dark",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div>
      <Card className={classes.card} raised elevation={10}>
        {/* <CardMedia className={classes.media} image={jewel.productImage} title={"Aayushi"} /> */}
        <CardMedia
          className={classes.media}
          onClick={() => {
            localStorage.setItem("productDetailsId", jewel._id);
            navigate("/viewdetails");
            //navigate(`/viewdetails/${jewel._id}`);
          }}
          image={
            jewel.productImage ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={jewel.productName}
        />

        <Typography
          variant="h6"
          color="textPrimary"
          align="center"
          component="p"
        >
          {jewel.productName}
        </Typography>

        <CardContent>
          <Typography
            variant="body1"
            align="center"
            color="textSecondary"
            component="p"
          >
            C$ {jewel.productPrice}
          </Typography>
          <br />
          {/* <Typography variant="body1" align='center' color="textSecondary" component="p">C$ {jewel.productDescription}</Typography> */}
        </CardContent>

        {role === "admin" && (
          <CardActions className={classes.cardActions}>
            <Button color="primary" size="medium" onClick={handleEdit}>
              <EditIcon fontSize="medium" />
              Edit
            </Button>

            <Button color="primary" size="medium" onClick={handleClickOpen}>
              <DeleteIcon fontSize="medium" />
              Delete
            </Button>
          </CardActions>
        )}
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this product?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please press yes to delete the product and press no to cancel this
            action
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default Jewel;

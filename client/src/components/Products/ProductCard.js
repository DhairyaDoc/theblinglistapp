import React, { useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { IconButton, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";
import { red } from "@mui/material/colors";
import moment from "moment";

export default function ProductCard({ data, favouriteInitial, countI }) {
  const navigate = useNavigate();

  const [favourite, setFavourite] = useState(data.favourite)
  const [count, setCount]= useState(countI)
  const removeFavourites = async (e) => {
    e.preventDefault();

    const result = await axios.put(
      BACKEND_URL + "favourites/removefavourites",
      {
        user_id: JSON.parse(localStorage.getItem("user"))._id,
        product_id: data._id,
      }
    );

    if (result.data.success) {
      setCount(1)
      setFavourite(false)
      toast.success("Product has been removed from wishlist successfully!", {
        position: "top-right",
        theme: "dark",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(
        "Something went wrong! Please refresh your page and try again.",
        {
          position: "top-right",
          theme: "dark",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const addToFavourites = async (e) => {
    e.preventDefault();
    const result = await axios.post(
      BACKEND_URL + "favourites/addToFavourites",
      {
        user_id: JSON.parse(localStorage.getItem("user"))._id,
        product_id: data._id,
      }
    );
    if (result.data.success) {
      setCount(1)
      setFavourite(true)
      toast.success("Product added to your wishlist!", {
        position: "top-right",
        theme: "dark",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(
        "Something went wrong! Please refresh your page and try again.",
        {
          position: "top-right",
          theme: "dark",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const viewProductDetails = (e) => {
    e.preventDefault();
    localStorage.setItem("productDetailsId", data._id);
    navigate("/viewdetails");
  };

  return (
    <div>
      <Card
        key={data.id}
        elevation={1}
        sx={{ maxWidth: 345, boxShadow: 5 }}
        xs={{ flex: 1 }}
      >
        {/* {`data fav ${data.favourite} favourite ${favourite}`} */}

        <CardHeader
          action={
            count===0? favouriteInitial ?
            <IconButton id={data._id} aria-label="favourite" onClick={event => removeFavourites(event)}>
              <FavoriteIcon sx={{ color: red[500] }} />
            </IconButton> :
            <IconButton id={data._id} aria-label="NotYetfavourite" onClick={event => addToFavourites(event)}>
              <FavoriteBorderIcon sx={{ color: red[500] }} />
            </IconButton>:
            favourite?
            <IconButton id={data._id} aria-label="favourite" onClick={event => removeFavourites(event)}>
            <FavoriteIcon sx={{ color: red[500] }} />
          </IconButton> :
          <IconButton id={data._id} aria-label="NotYetfavourite" onClick={event => addToFavourites(event)}>
            <FavoriteBorderIcon sx={{ color: red[500] }} />
          </IconButton>
          }
          title={
            data.productName.length > 22
              ? data.productName.substring(0, 20) + "..."
              : data.productName
          }
          subheader={moment(
            new Date(data.createdAt)
              .toISOString()
              .replace(/T/, " ")
              .replace(/\..+/, "")
          ).format("MMMM DD, YYYY")}
        />
        <CardMedia
          sx={{ boxShadow: 3 }}
          title={data.productName}
          image={`${data.productImage}`}
          style={{
            height: 0,
            paddingTop: "56.25%", // 16:9,
            marginTop: "50",
          }}
        />

        <CardContent>
          <table width="100%" maxWidth="100%">
            <tr>
              <td style={{ textAlign: "left" }}>
                <b>Price:</b> CAD {data.productPrice}
              </td>
              <td style={{ textAlign: "right" }}>
                {data.inventoryQuantity ? (
                  <Typography
                    backgroundColor="green"
                    textAlign="center"
                    color="white"
                    width="100%"
                    borderRadius="15%"
                  >
                    Available
                  </Typography>
                ) : (
                  <Typography
                    backgroundColor="red"
                    textAlign="center"
                    color="white"
                    width="100%"
                    borderRadius="15%"
                  >
                    Not Available
                  </Typography>
                )}
              </td>
            </tr>
            <tr style={{ textAlign: "left" }}>
              <b>Description:</b>
            </tr>
          </table>
          <Typography textAlign="justify">
            {data.productDescription.length > 99
              ? data.productDescription.substring(0, 96) + "..."
              : data.productDescription.length === 0
              ? <>No description available<br/><br/><br/></>
              : data.productDescription}
          </Typography>
        </CardContent>
        <div>
          <table align="center">
            <tr>
              <td>
                <Button
                  variant="outlined"
                  id={`detail-${data._id}`}
                  onClick={(event) => viewProductDetails(event)}
                >
                  {<InfoOutlinedIcon />}&nbsp;View Details
                </Button>
              </td>
              <td>
                <Button
                  variant="outlined"
                  onClick={() =>
                    navigate("/cart", { state: { ...data, quantity: 1 } })
                  }
                >
                  Add to Cart&nbsp; {<AddShoppingCartOutlinedIcon />}
                </Button>
              </td>
            </tr>
          </table>
          <br />
        </div>
      </Card>
      <ToastContainer />
    </div>
  );
}

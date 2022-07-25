import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from '@mui/material/CardActions';
import { IconButton, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";
import moment from "moment";

export default function FavouriteCard({ data, setFavourites, favourites }) {
  const navigate = useNavigate();

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
      let temp = favourites.filter(f => {
        if (f._id !== data._id) return f;
      })
      setFavourites(temp);
      toast.success("Product has been removed successfully!", {
        position: "top-right",
        theme: "dark",
        autoClose: 300,
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
          autoClose: 700,
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
        <CardHeader
          action={
            <IconButton
              id={data._id}
              aria-label="remove"
              onClick={(event) => removeFavourites(event)}
            >
              <CloseIcon />
            </IconButton>
          }
          title={
            data.productName.length < 23
              ? data.productName
              : data.productName.substring(0, 20) + "..."
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
        <CardContent >
            <div>
          <table width="100%" maxWidth="100%">
            <tr>
              <td style={{ textAlign: "left" }}>
                <b>Price:</b> CAD {data.productPrice}
              </td>
              <td style={{ textAlign: "right" }}>
                {data.inventoryQuantity > 0 ? (
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
            <tr>
              <td colSpan={2}><Typography textAlign="justify">
                {data.productDescription.length > 99
                  ? data.productDescription.substring(0, 96) + "..."
                  : data.productDescription.length === 0
                    ? <>No description available<br/><br/><br/></>
                    : data.productDescription}
              </Typography></td>
            </tr>
          </table>
          </div>
        </CardContent>
        <CardActions xs={{ flex: 1 }} disableSpacing>
          <div>
            <table align="center">
              <tr>
                <td>
                  <Button
                    variant="outlined"
                    onClick={(event) => viewProductDetails(event)}
                  >
                    {" "}
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
        </CardActions>
      </Card>
      <ToastContainer />
    </div >
  );
}

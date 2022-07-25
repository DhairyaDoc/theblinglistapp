/***
 * @author : Aayushi Rashesh Gandhi
 * @bannerID : B00890697
 * @email : aayushi.gandhi@dal.ca
 ***/

import React, { useState, useEffect } from "react";
import useStyles from "./Styles.js";
import Jewel from "./Jewel/Jewel.js";
import Form from "../Form/Form.js";
import { Grid, CircularProgress } from "@material-ui/core";
import { getProducts } from "../../../store/actions/admin.js";
import { useLocation, useNavigate } from "react-router-dom";
import { getSearchProducts } from "../../../store/actions/recommendation.js";
import { isUserLoggedIn } from "../../../Helpers/helper.js";
import { toast } from "react-toastify";
import { createProduct, editProduct } from "../../../store/actions/admin";

const Jewels = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [jewels, setJewels] = useState({});
  var [productInfo, setProductInfo] = useState({
    name: "",
    desc: "",
    price: "",
    quantity: "",
    color: "",
    metal: "",
    type: "",
    image: "",
    errors: {
      name: "",
      desc: "",
      price: "",
      quantity: "",
      color: "",
      metal: "",
      type: "",
      image: "",
    },
  });

  const role = localStorage.getItem("role");

  const getPro = () => {
    if (searchParams.get("search")) {
      getSearchProducts(searchParams.get("search")).then((result) => {
        setJewels(result);
      });
    } else {
      getProducts().then((result) => {
        setJewels(result);
      });
    }
  };

  useEffect(() => {
    if (isUserLoggedIn()) {
      getPro();
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProduct = (e) => {
    e.preventDefault();

    const body = {
      productName: productInfo.name,
      productType: productInfo.type,
      productPrice: productInfo.price,
      productDescription: productInfo.desc,
      productColor: productInfo.color,
      metalType: productInfo.metal,
      inventoryQuantity: productInfo.quantity,
      productImage: productInfo.image,
    };

    if (currentProductId) {
      editProduct(currentProductId, body).then((result) => {
        getPro();
        setCurrentProductId(null);
        handleClear();
        if (result.success === true) {
          toast.success("Product edited successfully", {
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
          toast.success("Product could not be edited. Please try again!", {
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
    } else {
      createProduct(body).then((result) => {
        getPro();
        handleClear();
        if (result.success === true) {
          toast.success("Added product successfully!", {
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
          toast.error("Please fill all the fields!", {
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
    }
  };

  const handleClear = () => {
    setProductInfo({
      name: "",
      desc: "",
      price: "",
      quantity: "",
      color: "",
      metal: "",
      type: "",
      image: "",
      errors: {
        name: "",
        desc: "",
        quantity: "",
        price: "",
        color: "",
        metal: "",
        type: "",
        image: "",
      },
    });
    setCurrentProductId(null);
  };

  return (
    <div>
      {role === "admin" && (
        <Form
          currentProductId={currentProductId}
          handleClear={handleClear}
          addProduct={addProduct}
          productInfo={productInfo}
          setProductInfo={setProductInfo}
        />
      )}

      {jewels["products"] ? (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {jewels["products"].map((jewel) => (
            <Grid key={jewel._id} item xs={12} sm={12} md={6} lg={4}>
              <Jewel
                jewel={jewel}
                getPro={getPro}
                setCurrentProductId={setCurrentProductId}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Jewels;

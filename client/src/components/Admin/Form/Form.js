/***
 * @author : Aayushi Rashesh Gandhi
 * @bannerID : B00890697
 * @email : aayushi.gandhi@dal.ca
 ***/

import React, { useEffect } from "react";
import useStyles from "./Styles.js";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { ALPHABET_REGEX } from "../../../Constants/constants.js";
import { NUMBER_REGEX } from "../../../Constants/constants";
import { ToastContainer} from "react-toastify";
import {
  getProduct,
} from "../../../store/actions/admin";

const Form = ({ currentProductId, handleClear, addProduct, productInfo, setProductInfo }) => {
  const classes = useStyles();

  useEffect(() => {
    if (currentProductId) {
      getProduct(currentProductId).then((result) => {
        if (result.success === true) {
          setProductInfo({
            name: result["product"]["productName"],
            desc: result["product"]["productDescription"],
            price: result["product"]["productPrice"],
            quantity: result["product"]["inventoryQuantity"],
            color: result["product"]["productColor"],
            metal: result["product"]["metalType"],
            type: result["product"]["productType"],
            image: result["product"]["productImage"],
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
        }
      });
    }
  }, [currentProductId]); // eslint-disable-line react-hooks/exhaustive-deps

  

  const handleProductNameEvents = () => {
    if (productInfo.name === "" || !productInfo.name.match(ALPHABET_REGEX)) {
      setProductInfo({
        ...productInfo,
        errors: {
          ...productInfo.errors,
          name: "Enter a valid product name!",
        },
      });
    } else {
      setProductInfo({
        ...productInfo,
        errors: {
          ...productInfo.errors,
          name: "",
        },
      });
    }
  };

  const handleProductPriceEvents = () => {
    if (productInfo.price === "" || !productInfo.price.match(NUMBER_REGEX)) {
      setProductInfo({
        ...productInfo,
        errors: {
          ...productInfo.errors,
          price: "Enter a valid price!",
        },
      });
    } else {
      setProductInfo({
        ...productInfo,
        errors: {
          ...productInfo.errors,
          price: "",
        },
      });
    }
  };

  const handleProductQuantityEvents = () => {
    if (
      productInfo.quantity === "" ||
      !productInfo.quantity.match(NUMBER_REGEX)
    ) {
      setProductInfo({
        ...productInfo,
        errors: {
          ...productInfo.errors,
          quantity: "Enter a valid quantity!",
        },
      });
    } else {
      setProductInfo({
        ...productInfo,
        errors: {
          ...productInfo.errors,
          quantity: "",
        },
      });
    }
  };

  

  const handleProductInformation = (fieldName, value) => {
    setProductInfo({
      ...productInfo,
      [fieldName]: value,
    });
  };



  return (
    <Paper className={classes.paper} elevation={10}>
      <form
        autoComplete="off"
        className={`${classes.root} ${classes.form}`}
        onSubmit={(event) => addProduct(event)}
      >
        <Typography variant="h6">
          {currentProductId ? "Edit Product" : "Add Product"}
        </Typography>
        <TextField
          name="name"
          variant="outlined"
          label="Product Name"
          fullWidth
          error={productInfo.errors.name === "" ? false : true}
          helperText={productInfo.errors.name}
          value={productInfo.name}
          onChange={(e) => {
            handleProductInformation("name", e.target.value);
          }}
          onBlur={handleProductNameEvents}
        />
        <TextField
          name="description"
          variant="outlined"
          error={productInfo.errors.desc === "" ? false : true}
          helperText={productInfo.errors.desc}
          value={productInfo.desc}
          label="Product Description"
          fullWidth
          onChange={(e) => {
            handleProductInformation("desc", e.target.value);
          }}
        />
        <TextField
          name="price"
          variant="outlined"
          label="Product Price"
          error={productInfo.errors.price === "" ? false : true}
          helperText={productInfo.errors.price}
          value={productInfo.price}
          fullWidth
          onChange={(e) => {
            handleProductInformation("price", e.target.value);
          }}
          onBlur={handleProductPriceEvents}
        />
        <TextField
          name="quantity"
          variant="outlined"
          label="Product Quantity"
          error={productInfo.errors.quantity === "" ? false : true}
          helperText={productInfo.errors.quantity}
          value={productInfo.quantity}
          fullWidth
          onChange={(e) => {
            handleProductInformation("quantity", e.target.value);
          }}
          onBlur={handleProductQuantityEvents}
        />
        <TextField
          name="color"
          variant="outlined"
          label="Product Color"
          fullWidth
          error={productInfo.errors.color === "" ? false : true}
          helperText={productInfo.errors.color}
          value={productInfo.color}
          onChange={(e) => {
            handleProductInformation("color", e.target.value);
          }}
        />
        <TextField
          name="metal"
          variant="outlined"
          label="Metal Type"
          fullWidth
          error={productInfo.errors.metal === "" ? false : true}
          helperText={productInfo.errors.metal}
          value={productInfo.metal}
          onChange={(e) => {
            handleProductInformation("metal", e.target.value);
          }}
        />
        <TextField
          name="type"
          variant="outlined"
          label="Product Type"
          fullWidth
          error={productInfo.errors.type === "" ? false : true}
          helperText={productInfo.errors.type}
          value={productInfo.type}
          onChange={(e) => {
            handleProductInformation("type", e.target.value);
          }}
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => handleProductInformation("image", base64)}
          />
        </div>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          disabled={false}
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => {
            handleClear();
          }}
        >
          Clear
        </Button>
      </form>
      <ToastContainer />
    </Paper>
  );
};

export default Form;

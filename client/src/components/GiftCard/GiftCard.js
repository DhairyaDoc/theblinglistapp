/***
 * @author : Dhairya Analbhai Doctor
 * @bannerID : B00864868
 * @email : dh973257@dal.ca
 * @description: Parent component of SelectGiftCard, PayForGiftCard, PayableAmount.
 ***/
import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";

import "react-toastify/dist/ReactToastify.css";

import AddUserInformation from "./AddUserInformation/AddUserInformation";
import SelectGiftCard from "./SelectGiftCard/SelectGiftCard";
import { stripePaymentPublishKey } from "../../config/config";

import "./GiftCard.css";
import {
  EMAIL_REGEX,
  ALPHABET_REGEX,
  NUMBER_REGEX,
} from "../../Constants/constants.js";

import { useNavigate } from "react-router-dom";
import PayForGiftCard from "./PayForGiftCard/PayForGiftCard";
import { giftCardPayment } from "../../store/actions/payment";
import PayableAmount from "./PayableAmount/PayableAmount";
import { isUserLoggedIn } from "../../Helpers/helper";

const GiftCard = () => {
  const navigate = useNavigate();
  const imageList = [
    "https://cdn.pixabay.com/photo/2015/08/11/08/21/coupon-883642__340.png",
    "https://cdn.pixabay.com/photo/2015/08/11/08/21/coupon-883638__340.png",
    "https://cdn.pixabay.com/photo/2014/10/04/05/02/coupon-472481__340.jpg",
    "https://cdn.pixabay.com/photo/2015/08/11/08/21/coupon-883636__340.png",
    "https://cdn.pixabay.com/photo/2015/02/10/17/41/red-631349__340.jpg",
    "https://cdn.pixabay.com/photo/2014/11/02/04/52/christmas-513476__340.jpg",
    "https://cdn.pixabay.com/photo/2018/02/25/17/53/banner-3181255__340.png",
    "https://cdn.pixabay.com/photo/2015/02/10/17/41/red-631346__340.jpg",
    "https://cdn.pixabay.com/photo/2016/06/14/14/00/happy-fathers-day-1456605__340.jpg",
  ];

  const [giftCard, setGiftCard] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    appartmentNumber: "",
    streetNumber: "",
    streetName: "",
    postalCode: "",
    errors: {
      name: "",
      email: "",
      appartmentNumber: "",
      streetNumber: "",
      streetName: "",
      pinCode: "",
      postalCode: "",
    },
  });

  const [amount, setAmount] = useState();
  const [errorInAmount, setErrorInAmount] = useState("");

  useEffect(() => {
    let role = localStorage.getItem("role");
    isUserLoggedIn()
      ? role === "customer"
        ? navigate("/giftcard")
        : navigate("/admin")
      : navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectGiftCard = (imageIndex) => {
    setGiftCard(imageList[imageIndex]);
  };

  const resetGiftCard = () => {
    setGiftCard("");
  };

  const handleUserInformation = (fieldName, value) => {
    setUserInfo({
      ...userInfo,
      [fieldName]: value,
    });
  };

  const handleNameBlurEvents = () => {
    if (userInfo.name === "") {
      setUserInfo({
        ...userInfo,
        errors: {
          ...userInfo.errors,
          name: "Please enter a valid name!",
        },
      });
    } else if (!userInfo.name.match(ALPHABET_REGEX)) {
      setUserInfo({
        ...userInfo,
        errors: {
          ...userInfo.errors,
          name: "Name should only contain characters!",
        },
      });
    } else {
      setUserInfo({
        ...userInfo,
        errors: {
          ...userInfo.errors,
          name: "",
        },
      });
    }
  };

  const handleEmailBlurEvents = () => {
    if (userInfo.email === "" || !userInfo.email.match(EMAIL_REGEX)) {
      setUserInfo({
        ...userInfo,
        errors: {
          ...userInfo.errors,
          email: "Please enter a valid email!",
        },
      });
    } else {
      setUserInfo({
        ...userInfo,
        errors: {
          ...userInfo.errors,
          email: "",
        },
      });
    }
  };

  const handleAptNumberBlurEvents = () => {
    if (userInfo.appartmentNumber === "") {
      setUserInfo({
        ...userInfo,
        errors: {
          ...userInfo.errors,
          appartmentNumber: "Enter a valid appartment number!",
        },
      });
    } else {
      setUserInfo({
        ...userInfo,
        errors: {
          ...userInfo.errors,
          appartmentNumber: "",
        },
      });
    }
  };

  const handleStreetNumberBlurEvents = () => {
    if (
      userInfo.streetNumber === "" ||
      !userInfo.streetNumber.match(NUMBER_REGEX)
    ) {
      setUserInfo({
        ...userInfo,
        errors: {
          ...userInfo.errors,
          streetNumber: "Enter valid street number!",
        },
      });
    } else {
      setUserInfo({
        ...userInfo,
        errors: {
          ...userInfo.errors,
          streetNumber: "",
        },
      });
    }
  };

  const handleStreetNameBlurEvents = () => {
    if (
      userInfo.streetName === "" ||
      !userInfo.streetName.match(ALPHABET_REGEX)
    ) {
      setUserInfo({
        ...userInfo,
        errors: {
          ...userInfo.errors,
          streetName: "Enter valid street name!",
        },
      });
    } else {
      setUserInfo({
        ...userInfo,
        errors: {
          ...userInfo.errors,
          streetName: "",
        },
      });
    }
  };

  const handlePostalCodeBlurEvents = () => {
    if (userInfo.postalCode === "") {
      setUserInfo({
        ...userInfo,
        errors: {
          ...userInfo.errors,
          postalCode: "Enter a valid postal code!",
        },
      });
    } else {
      setUserInfo({
        ...userInfo,
        errors: {
          ...userInfo.errors,
          postalCode: "",
        },
      });
    }
  };

  const handleAmount = (event) => {
    setAmount(parseInt(event.target.value));
  };

  const validateAmount = () => {
    if (!amount || amount <= 0) {
      setErrorInAmount("Enter valid amount!");
    } else {
      setErrorInAmount("");
    }
  };

  const getGiftCard = (token) => {
    if (
      userInfo.name === "" ||
      userInfo.errors.name !== "" ||
      userInfo.email === "" ||
      userInfo.errors.email !== "" ||
      userInfo.appartmentNumber === "" ||
      userInfo.errors.appartmentNumber !== "" ||
      userInfo.streetName === "" ||
      userInfo.errors.streetName !== "" ||
      userInfo.streetNumber === "" ||
      userInfo.errors.streetNumber !== "" ||
      userInfo.postalCode === "" ||
      userInfo.errors.postalCode !== "" ||
      giftCard === "" ||
      !amount ||
      errorInAmount !== ""
    ) {
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
    } else {
      const body = {
        token: token,
        amount: amount * 100 + amount * 100 * 0.15 + 3.99 * 100,
        user: {
          email: userInfo.email,
          username: userInfo.name,
          address: `Appartment Number ${userInfo.appartmentNumber}, ${userInfo.streetNumber} ${userInfo.streetName}, ${userInfo.postalCode}`,
        },
        giftCardImage: giftCard,
      };
      giftCardPayment(body).then((result) => {
        if (result.success) {
          toast.success(
            "Payment successfull! Your gift card will arrive soon.",
            {
              position: "bottom-right",
              theme: "dark",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              onClose: () => {
                navigate("/recommendation");
              },
            }
          );
        } else {
          toast.error("Something went wrong!", {
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

  return (
    <div>
      <Grid align="center" container mt={6}>
        <Grid xs={12} mb={6}>
          <SelectGiftCard
            imageList={imageList}
            selectGiftCard={selectGiftCard}
            resetGiftCard={resetGiftCard}
            giftCard={giftCard}
          />
        </Grid>
        <Grid xs={12} mb={6}>
          <AddUserInformation
            userInfo={userInfo}
            handleUserInformation={handleUserInformation}
            handleNameBlurEvents={handleNameBlurEvents}
            handleEmailBlurEvents={handleEmailBlurEvents}
            handleAptNumberBlurEvents={handleAptNumberBlurEvents}
            handleStreetNumberBlurEvents={handleStreetNumberBlurEvents}
            handleStreetNameBlurEvents={handleStreetNameBlurEvents}
            handlePinCodeBlurEvents={handlePostalCodeBlurEvents}
          />
        </Grid>
        <Grid xs={12} mb={6}>
          <PayForGiftCard
            amount={amount}
            errorInAmount={errorInAmount}
            handleAmount={handleAmount}
            validateAmount={validateAmount}
          />
        </Grid>
        <Grid xs={12} mb={6}>
          <PayableAmount amount={amount} />
        </Grid>
        <Grid xs={12} mb={6}>
          <StripeCheckout
            stripeKey={stripePaymentPublishKey}
            token={getGiftCard}
            amount={amount * 100 + amount * 100 * 0.15 + 3.99 * 100}
            name="Get Gift Card"
          >
            <Button color="secondary" variant="contained" size="large">
              Confirm Payment
            </Button>
          </StripeCheckout>
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default GiftCard;

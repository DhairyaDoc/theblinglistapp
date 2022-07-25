/***
 * @author : Dhairya Analbhai Doctor
 * @bannerID : B00864868
 * @email : dh973257@dal.ca
 * @description: API calls to backend for payment for checkout, getting gift card, and getting cart items.
 ***/
import { BACKEND_URL } from "../config/config";

const PaymentService = {
  checkout: (params) => {
    return fetch(BACKEND_URL + "checkout/payment", {
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

  giftCardPayment: (params) => {
    return fetch(BACKEND_URL + "checkout/payGiftCard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  },

  getUserCartService: () => {
    const userID = JSON.parse(localStorage.getItem("user"))._id;
    return fetch(`${BACKEND_URL}cart/getUserItems/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        return response;
      });
  },

  checkPromoCode: (promoCode) => {
    return fetch(`${BACKEND_URL}checkout/checkPromoCode/${promoCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        return response;
      });
  },

  getUserCartItems: () => {
    const userID = JSON.parse(localStorage.getItem("user"))._id;

    return fetch(BACKEND_URL + `checkout/getUserCartItems/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        return response;
      });
  },
};

export { PaymentService };

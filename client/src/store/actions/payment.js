/***
 * @author : Dhairya Analbhai Doctor
 * @bannerID : B00864868
 * @email : dh973257@dal.ca
 * @description: Actions defined for calling services for making payment to checkout and get gift card, and get cart items.
 ***/
import { PaymentService } from "../../services/PaymentService";

export const checkoutPayment = (params) => {
  return PaymentService.checkout(params).then((result) => {
    return result;
  });
};

export const giftCardPayment = (params) => {
  return PaymentService.giftCardPayment(params).then((result) => {
    return result;
  });
};

export const checkPromoCode = (promoCode) => {
  return PaymentService.checkPromoCode(promoCode).then((response) => {
    return response;
  });
};

export const getCartItems = () => {
  return PaymentService.getUserCartItems().then((response) => {
    return response;
  });
};

import { INSERT_REVIEW } from "../constants";

export const insertReview = (title, description, rating,user_name) => {
  return {
    type: INSERT_REVIEW,
    title: title,
    description: description,
    rating: rating,
    user_name: user_name
  };
};

export const setIntialReviewState = (data) => {
  return {
    type: "INITAL_REVIEW_STATE",
    data: data,
  };
};

export const setStars = (stars) => {
  return {
    type: "SET_STARS",
    stars: stars,
  };
};

export const  addToCart = (item) => {
  return {
    type: "ADD_TO_CART",
    item: item,
  };
};

export const increase = (index) => {
  return {
    type: "INCREASE_QUANTITY",
    index: index,
  };
};

  export const decrease = (index) => {
    return {
      type: "DECREASE_QUANTITY",
      index: index,
    };
};

export const fetchCart = (cart) => {
  return{
    type: "FETCH_TO_CART",
    cart: cart
  }
}
export const deleteItem =(id) => {
  return{
    type: "REMOVE_ITEM",
    id:id
  } 
}


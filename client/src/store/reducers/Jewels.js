const initstate = {
  stars: -1,
  reviews: [],
  filtered_reviews: [],
  cart: { userid: "", items: [] },
};
const jewelsReducer = (state = initstate, action) => {
  switch (action.type) {
    case "SET_STARS":
      if (action.stars === -1) {
        state.filtered_reviews = state.reviews;
      } else {
        state.filtered_reviews = state.reviews.filter((review) => {
          return review.rating === action.stars;
        });
      }
      state = {
        stars: action.stars,
        reviews: [...state.reviews],
        filtered_reviews: [...state.filtered_reviews],
      };
      return state;

    case "INITAL_REVIEW_STATE":
      state = { ...state, reviews: action.data, filtered_reviews: action.data };
      return state;

    case "INSERT_REVIEW":
      state = {
        stars: -1,
        reviews: [
          ...state.reviews,
          {
            title: action.title,
            description: action.description,
            rating: action.rating,
            user_name: action.user_name,
          },
        ],
        filtered_reviews: [
          ...state.reviews,
          {
            title: action.title,
            description: action.description,
            rating: action.rating,
            user_name: action.user_name,
          },
        ],
      };
      return state;

    case "ADD_TO_CART":
      state.cart.items = [...state.cart.items, action.item];
      state.cart.userid = JSON.parse(localStorage.getItem("user"))._id;
      state.cart.items = state.cart.items.filter(
        (v, i, a) => a.findIndex((v2) => v2._id === v._id) === i
      );
      return state;

    case "FETCH_TO_CART":
      state = { ...state, cart: action.cart };
      return { ...state };

    case "INCREASE_QUANTITY":
      let tempSub = {};
      tempSub = Object.assign(tempSub, state);
      tempSub.cart.items[action.index].quantity += 1;
      state = {
        ...state,
        cart: { userid: state.cart.userid, items: [...tempSub.cart.items] },
      };
      return { ...state };

    case "DECREASE_QUANTITY":
      let tempAdd = {};
      tempAdd = Object.assign(tempAdd, state);
      tempAdd.cart.items[action.index].quantity -= 1;
      state = {
        ...state,
        cart: { userid: state.cart.userid, items: [...tempAdd.cart.items] },
      };
      return { ...state };

    case "REMOVE_ITEM":
      let tempCart = state.cart;
      tempCart.items = tempCart.items.filter((item) => {
        if (action.id !== item._id) {
          return item;
        }
      });
      state = {
        ...state,
        cart: { userid: state.cart.userid, items: [...tempCart.items] },
      };
      return state;

    default:
      return state;
  }
};

export default jewelsReducer;

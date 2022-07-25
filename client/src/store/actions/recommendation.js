/***
 * @author : Aayushi Rashesh Gandhi
 * @bannerID : B00890697
 * @email : aayushi.gandhi@dal.ca
 ***/

import { RecommendationService } from "../../services/RecommendationService";

export const getSearchProducts = (searchQuery) => {
  return RecommendationService.getSearchProducts(searchQuery).then((searchProducts) => {
    return searchProducts;
  });
};

export const getNewArrivalsProducts = () => {
  return RecommendationService.getNewArrivalsProducts().then((searchProducts) => {
    return searchProducts;
  });
};

export const getMostPopularProducts = () => {
  return RecommendationService.getMostPopularProducts().then((searchProducts) => {
    return searchProducts;
  });
};

export const getYouMayLikeProducts = (userid) => {
  return RecommendationService.getYouMayLikeProducts(userid).then((searchProducts) => {
    return searchProducts;
  });
};
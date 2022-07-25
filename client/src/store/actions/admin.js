/***
 * @author : Aayushi Rashesh Gandhi
 * @bannerID : B00890697
 * @email : aayushi.gandhi@dal.ca
 ***/

import { AdminService } from "../../services/AdminService";

export const getProduct = (id) => {
  return AdminService.getProduct(id).then((product) => {
    return product;
  });
};

export const getProducts = () => {
  return AdminService.getProducts().then((products) => {
    return products;
  });
};

export const createProduct = (params) => {
  return AdminService.createProduct(params).then((result) => {
    return result;
  });
};

export const deleteProduct = (id) => {
  return AdminService.deleteProduct(id).then((result) => {
    return result;
  });
};

export const editProduct = (id, params) => {
  return AdminService.editProduct(id, params).then((result) => {
    return result;
  });
};

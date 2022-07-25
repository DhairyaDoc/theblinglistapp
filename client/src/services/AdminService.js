/***
 * @author : Aayushi Rashesh Gandhi
 * @bannerID : B00890697
 * @email : aayushi.gandhi@dal.ca
 ***/

import { BACKEND_URL } from "../config/config";

const AdminService = {
  getProduct: (id) => {
    const token = "jwt-token";

    return fetch(BACKEND_URL + `administration/admin/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },

  getProducts: () => {
    const token = "jwt-token";

    return fetch(BACKEND_URL + `administration/admin/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },

  createProduct: (params) => {
    const token = "jwt-token";

    return fetch(BACKEND_URL + "administration/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },

  deleteProduct: (id) => {
    const token = "jwt-token";

    return fetch(BACKEND_URL + `administration/admin/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },

  editProduct: (id, params) => {
    const token = "jwt-token";

    return fetch(BACKEND_URL + `administration/admin/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },
};

export { AdminService };

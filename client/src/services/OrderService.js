// **Name** : Suchitra Dhamu
// **Banner ID** : B0897187
// **Group Id** : 7

import { BACKEND_URL } from "../config/config";

const OrderService = {

    getOrders: () => {
        // const token = localStorage.getItem("token");
        const token = "jwt-token";

        return fetch(BACKEND_URL + "previousorders", {
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

    getOrder: (id) => {
        const token = "jwt-token";

        return fetch(BACKEND_URL + `orderdetails/${id}`, {
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
    getOrderByUserId: (id) => {
        const token = "jwt-token";

        return fetch(BACKEND_URL + `previousorders/${id}`, {
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

    editOrder: (id) => {
        //const token = localStorage.getItem("token");
        const token = "jwt-token";

        return fetch(BACKEND_URL + `previousorder/${id}`, {
            method: "POST",
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
};

export { OrderService };

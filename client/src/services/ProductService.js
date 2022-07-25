import { BACKEND_URL } from "../config/config";

const ProductService = {

    getProducts: () => {
        // const token = localStorage.getItem("token");
        const token = "jwt-token";

        return fetch(BACKEND_URL + "", {
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

    getProduct: (id) => {
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
    

    addFvourites: (id) => {
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

export { ProductService };

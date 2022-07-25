import { BACKEND_URL } from "../config/config";

const ProductService = {

    getFavourites: (id) => {
        const token = "jwt-token";

        return fetch(BACKEND_URL + `fetchfavourites`, {
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

        return fetch(BACKEND_URL + `removefavourites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + token,
            },
            body: JSON.stringify({ userId: localStorage.getItem("user")})
        })
            .then((res) => res.json())
            .then((data) => {
                return data;
            });
    },
};

export { ProductService };

// **Name** : Suchitra Dhamu
// **Banner ID** : B0897187
// **Group Id** : 7

import { OrderService } from "../../services/OrderService";
import { AdminService } from "../../services/AdminService";

export const getOrders = () => {
    return OrderService.getOrders().then((orders) => {
        return orders;
    });
};

export const getProduct = (id) => {
    return AdminService.getProduct(id).then((product) => {
      return product;
    });
  };

export const getOrder = (id) => {
    return OrderService.getOrder(id).then((order) => {
        return order;
    });
};

export const getOrderByUserId = (id) => {
    return OrderService.getOrderByUserId(id).then((result) => {
        return result;
    });
};

export const editOrder = (id) => {
    return OrderService.editOrder(id).then((result) => {
        return result;
    });
};
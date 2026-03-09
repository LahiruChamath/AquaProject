import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3500/";

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export async function createOrder(orderData) {
  return await axios
    .post(apiUrl + "orders", orderData, { headers: getHeaders() })
    .then((res) => res.data);
}

export async function getOrders() {
  return await axios
    .get(apiUrl + "orders", { headers: getHeaders() })
    .then((res) => res.data);
}

export async function getMyOrders() {
  return await axios
    .get(apiUrl + "orders/myorders", { headers: getHeaders() })
    .then((res) => res.data);
}

export async function updateOrderToDelivered(id) {
  return await axios
    .put(apiUrl + `orders/${id}/deliver`, {}, { headers: getHeaders() })
    .then((res) => res.data);
}

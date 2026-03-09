import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3500/";

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export async function getUsers() {
  return await axios
    .get(apiUrl + "admin/get-users", { headers: getHeaders() })
    .then((data) => data);
}

export async function getSearchedUsers(obj) {
  return await axios
    .post(apiUrl + "admin/search-user", obj, { headers: getHeaders() })
    .then((data) => data);
}

export async function getProducts() {
  return await axios
    .get(apiUrl + "admin/get-products", { headers: getHeaders() })
    .then((data) => data);
}

export async function getSearchedProducts(obj) {
  return await axios
    .post(apiUrl + "admin/search-product", obj, { headers: getHeaders() })
    .then((data) => data);
}

export async function updateSellerStatus(obj) {
  return await axios
    .post(apiUrl + "admin/update-user-status", obj, { headers: getHeaders() })
    .then((data) => data);
}

export async function updateProductStatus(obj) {
  return await axios
    .post(apiUrl + "admin/update-product-status", obj, { headers: getHeaders() })
    .then((data) => data);
}

export async function getSellerReviews(sellerId) {
  return await axios
    .get(apiUrl + `admin/seller-reviews/${sellerId}`, { headers: getHeaders() })
    .then((data) => data);
}

import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3500/";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export async function getAllProducts() {
  return await axios
    .get(apiUrl + "product", { headers })
    .then((data) => data);
}

export async function addProduct(obj) {
  return await axios
    .post(apiUrl + "product/", obj, { headers })
    .then((data) => data);
}

export async function searchProducts(productName) {
  return await axios
    .post(apiUrl + "product/search-product", { productName }, { headers })
    .then((data) => data);
}

export async function getProduct(id) {
  return await axios
    .get(apiUrl + "product/" + id, { headers })
    .then((data) => data);
}

export async function editProduct(obj) {
  return await axios
    .patch(apiUrl + "product/", obj, { headers })
    .then((data) => data);
}

export async function createProductReview(productId, review) {
  const token = localStorage.getItem("token");
  return await axios
    .post(apiUrl + `product/${productId}/reviews`, review, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((data) => data);
}

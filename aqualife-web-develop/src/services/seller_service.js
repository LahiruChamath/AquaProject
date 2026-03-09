import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3500/";

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export async function getProducts() {
  return await axios.get(apiUrl + "seller/", { headers: getHeaders() }).then((data) => data);
}

export async function deleteProduct(id) {
  return await axios
    .delete(apiUrl + "seller/" + id, { headers: getHeaders() })
    .then((data) => data);
}

export async function getSearchedProducts(obj) {
  return await axios
    .post(apiUrl + "seller/search-product", obj, { headers: getHeaders() })
    .then((data) => data);
}

export async function getProductById(id) {
  return await axios
    .get(apiUrl + "seller/get-product/" + id, { headers: getHeaders() })
    .then((data) => data);
}

import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3500/";

export async function registerUser(obj) {
  return await axios.post(apiUrl + 'users', obj).then(data => data);
}

export async function loginUser(obj) {
  return await axios.post(apiUrl + 'auth', obj).then(data => data);
}
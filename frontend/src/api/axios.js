import axios from "axios";
const BASE_URL = "http://localhost:4000";

export default axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

export const axiosPrivate = axios.create({
    headers: { "Content-Type": "application/json" },
    baseURL: BASE_URL,
    withCredentials: true,
    Accept: "application/json",
});



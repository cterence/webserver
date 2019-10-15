import axios from "axios";
import { Login } from "../pages/login/types/Login";
const url =
    window.location.protocol + "//" + window.location.hostname + ":3000";

export const postLogin = async (values: Login) => {
    const response = await axios.post(`${url}/login`, values, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    });
    return response.data;
};

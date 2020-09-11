import axios from "axios";
import { Login } from "../pages/login/components/types";
import { Signup } from "../pages/signup/components/types";
import { Cookies } from "react-cookie";

const PREFIX = "/api";

export const getToken = () => {
    const cookies = new Cookies();
    return cookies.get("token");
};

export const postLogin = async (values: Login) => {
    const url = PREFIX + "/login";
    const response = await axios.post(url, values);
    return response.data;
};

export const postSignup = async (values: Signup) => {
    const url = PREFIX + "/signup";
    const response = await axios.post(url, values);
    return response.data;
};

export const verifyToken = async () => {
    const url = PREFIX + "/verify";
    const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
};

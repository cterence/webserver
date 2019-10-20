import axios from "axios";
import { Login } from "../pages/login/types/Login";
import { Signup } from "../pages/signup/types/Signup";

const PREFIX = "/api";

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

export const verifyToken = async (token: string) => {
    const url = PREFIX + "/verify";
    const response = await axios.post(url, { token });
    return response.data;
};

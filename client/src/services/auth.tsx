import axios from "axios";
import { Login } from "../pages/login/types/Login";
import { Signup } from "../pages/signup/types/Signup";

export const postLogin = async (values: Login) => {
    const response = await axios.post("/login", values);
    return response.data;
};

export const postSignup = async (values: Signup) => {
    const response = await axios.post("/signup", values);
    return response.data;
};

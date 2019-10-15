import axios from "axios";
import { Login } from "../pages/login/types/Login";

export const postLogin = async (values: Login) => {
    const response = await axios.post("/login", values);
    return response.data;
};

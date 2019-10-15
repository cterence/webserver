import axios from "axios";
import { Login } from "../pages/login/types/Login";
// const url =
//    window.location.protocol + "//" + window.location.hostname;

export const postLogin = async (values: Login) => {
    const response = await axios.post('/login', values);
    return response.data;
};

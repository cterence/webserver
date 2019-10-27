import axios from "axios";
import { getToken } from "./auth";

const PREFIX = "/api";

export const getRoles = async () => {
    const url = PREFIX + "/roles";
    const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
};

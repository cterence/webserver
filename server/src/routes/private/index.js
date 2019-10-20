import { Router } from "express";
import userRoutes from "./user";

export default () => {
    let api = Router();

    userRoutes(api);

    return api;
};

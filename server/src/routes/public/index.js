import { Router } from "express";
import verifyRoutes from "./verify";
import userRoutes from "./user";

export default () => {
    let api = Router();

    verifyRoutes(api);
    userRoutes(api);

    return api;
};

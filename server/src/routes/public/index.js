import { Router } from "express";
import verifyRoutes from "./verify";

export default () => {
    let api = Router();

    verifyRoutes(api);

    return api;
};

import "core-js/stable";
import "regenerator-runtime/runtime";

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import dotenv from "dotenv";
import appRoot from "app-root-path";

import privateApi from "./routes/private";
import publicApi from "./routes/public";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(appRoot.path, "client/build")));
}

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(cookieParser({ secret: process.env.COOKIE_SECRET }));

app.use(cors());
app.use(helmet());

app.use("/api", privateApi());
app.use("/api", publicApi());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("API listening on port", port);
});

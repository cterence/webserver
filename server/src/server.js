// babel/polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import appRoot from "app-root-path";

import privateApi from "./routes/private";
import publicApi from "./routes/public";

appRoot.setPath(path.join(appRoot.path, "../"));
dotenv.config({ path: path.join(appRoot.path, ".env") });

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

app.set("trust proxy", true);

app.use(cors({ credentials: true }));

app.use("/api", privateApi());
app.use("/api", publicApi());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("API listening on port", port);
});

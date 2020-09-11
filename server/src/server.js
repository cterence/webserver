import "core-js/stable";
import "regenerator-runtime/runtime";

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fs from "fs";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import dotenv from "dotenv";
import appRoot from "app-root-path";

import privateApi from "./routes/private";
import publicApi from "./routes/public";
import { isAuthenticated } from "./middleware/authentication";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(appRoot.path, "client/build")));
}

app.use("/public", express.static(path.join(appRoot.path, "server/public/")));

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());
app.use(cookieParser({ secret: process.env.COOKIE_SECRET }));

app.use(cors());
app.use(helmet());

app.use("/api", publicApi());
app.use("/api", isAuthenticated, privateApi());

app.use((req, res) => {
    res.status(404);

    // respond with json
    if (req.accepts("html")) {
        const notFoundPath = path.join(appRoot.path, "client/public/404.html");
        if (fs.existsSync(notFoundPath)) {
            res.sendFile(notFoundPath);
            return;
        }
    }

    // respond with json
    if (req.accepts("json")) {
        res.send({ error: "Not found" });
        return;
    }

    // default to plain-text. send()
    res.type("txt").send("Not found");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("API listening on port", port);
});

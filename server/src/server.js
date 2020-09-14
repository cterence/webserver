import "core-js/stable";
import "regenerator-runtime/runtime";

import express from "express";
import crypto from "crypto";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fs from "fs";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import dotenv from "dotenv";
import appRoot from "app-root-path";
import http from "http";

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

const verifyPostData = (req, res, next) => {
    const secret = process.env.GIT_HOOK_SECRET;
    const sigHeaderName = "X-Hub-Signature";
    const payload = JSON.stringify(req.body);
    if (!payload) {
        return next("Request body empty");
    }

    const sig = req.get(sigHeaderName) || "";
    const hmac = crypto.createHmac("sha1", secret);
    const digest = Buffer.from(
        "sha1=" + hmac.update(payload).digest("hex"),
        "utf8"
    );
    const checksum = Buffer.from(sig, "utf8");
    if (
        checksum.length !== digest.length ||
        !crypto.timingSafeEqual(digest, checksum)
    ) {
        return next(
            `Request body digest (${digest}) did not match ${sigHeaderName} (${checksum})`
        );
    }
    return next();
};

app.post("/git-deploy", verifyPostData, (req, res) => {
    console.log("push");
});

app.use((req, res) => {
    res.status(404);

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

const port = process.env.PORT || 8080;

const httpServer = http.createServer(app);

httpServer.listen(port, () => console.log(`HTTP listening on port ${port}`));

// const fs = require("fs");
// const http = require("http");
// const https = require("https");
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

// const privateKey = fs.readFileSync(process.env.CERT_PRIVATE_KEY, "utf8");
// const certificate = fs.readFileSync(process.env.CERT_PUBLIC_KEY, "utf8");
// const ca = fs.readFileSync(process.env.CERT_CHAIN, "utf8");
// const ensureSecure = (req, res, next) => {
//     if (req.secure) {
//         return next();
//     }
//     res.redirect("https://" + req.hostname + req.url);
// };

// app.all("*", ensureSecure);
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

// const credentials = {
//     key: privateKey,
//     cert: certificate,
//     ca: ca
// };

app.use("/api", privateApi());
app.use("/api", publicApi());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("API listening on port", port);
});

// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

// httpServer.listen(80, () => {
//     console.log("HTTP Server running on port 80");
// });

// httpsServer.listen(443, () => {
//     console.log("HTTPS Server running on port 443");
// });

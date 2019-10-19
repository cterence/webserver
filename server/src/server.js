require("@babel/polyfill");
// const fs = require("fs");
// const http = require("http");
// const https = require("https");
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";
import appRoot from "app-root-path";
import { Client } from "pg";

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

const secret = process.env.JWT_SECRET;
const client = new Client({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB
});

const connect_pg = async () => {
    try {
        await client.connect();
    } catch (err) {
        console.error(err);
    }
};

connect_pg();

const issueToken = async login => {
    return jwt.sign({ login }, secret, { expiresIn: "4h" });
};

const verifyToken = (req, res, next) => {
    if (req.cookies.token) {
        if (jwt.verify(req.cookies.token, secret)) return next();
        return res
            .status(401)
            .json({ success: false, message: "Invalid token" });
    }
    return res.status(401).json({ success: false });
};

app.post("/login", async (req, res) => {
    if (req.body.login && req.body.password) {
        const query = await client.query(
            "SELECT login, password FROM web_user WHERE login=$1",
            [req.body.login]
        );
        if (query.rowCount) {
            const { login, password } = query.rows[0];
            if (await bcrypt.compare(req.body.password, password)) {
                const token = await issueToken(login);
                return res.status(200).json({
                    success: true,
                    token
                });
            }
            return res.status(403).json({
                success: false,
                err: "Wrong password"
            });
        }
        return res.status(403).json({
            success: false,
            message: "User not found"
        });
    }
    return res.status(403).json({
        success: false
    });
});

app.post("/signup", async (req, res) => {
    if (req.body.key && req.body.key === process.env.API_SIGNUP) {
        if (req.body.login && req.body.password) {
            try {
                const hash = await bcrypt.hash(req.body.password, 10);
                await client.query("INSERT INTO web_user VALUES ($1, $2)", [
                    req.body.login,
                    hash
                ]);
                return res.status(200).json({ success: true });
            } catch (err) {
                return res.status(400).json({ success: false, err });
            }
        }
        return res.status(400).json({ success: false });
    }
    return res.status(403).json({ success: false });
});

app.post("/logout", (req, res) => {
    if (req.cookies.token) {
        return res
            .clearCookie("token")
            .status(204)
            .send();
    }
    return res
        .status(400)
        .json({ success: false, message: "You weren't logged in" });
});

app.get("/protected", verifyToken, async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "your token is correct boi"
    });
});

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

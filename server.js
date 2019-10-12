const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const app = express();

const privateKey = fs.readFileSync(process.env.CERT_PRIVATE_KEY, "utf8");
const certificate = fs.readFileSync(process.env.CERT_PUBLIC_KEY, "utf8");
const ca = fs.readFileSync(process.env.CERT_CHAIN, "utf8");

const ensureSecure = (req, res, next) => {
    if (req.secure) {
        return next();
    }
    res.redirect("https://" + req.hostname + req.url);
};

app.all("*", ensureSecure);
app.use("/", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

const secret = process.env.JWT_SECRET;

const { Client } = require("pg");
const client = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB
});
client.connect();

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
                return res
                    .cookie("token", token, { expiresIn: 14400 })
                    .status(200)
                    .json({
                        success: true
                    });
            }
            return res.status(403).json({
                success: false,
                err: "Wrong password"
            });
        }
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    return res.status(403).json({
        success: false
    });
});

app.post("/signup", async (req, res) => {
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

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
    console.log("HTTP Server running on port 80");
});

httpsServer.listen(443, () => {
    console.log("HTTPS Server running on port 443");
});
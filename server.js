import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
// import http from "http";
import https from "https";
import quoteRouter from "./src/api/routes/quoteRouter";
import authRouter from "./src/api/routes/authRouter";
import cache from "./src/api/config/config";
import priceHistoryRouter from "./src/api/routes/priceHistoryRouter";

const privateKey = fs.readFileSync("key.pem", "utf8");
const certificate = fs.readFileSync("certificate.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Add the routers below.
 */
app.use("/quote", quoteRouter);
app.use("/auth", authRouter);
app.use("/history", priceHistoryRouter);

// const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// httpServer.listen(cache.get("PORT"));
httpsServer.listen(cache.get("SSL_PORT"));

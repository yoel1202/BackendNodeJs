import express from "express";
import parse from "body-parser";
 import cors from "cors";
// import morgan from "morgan";

// Routes

import clients from "./routes/clients.routes";
import login from "./routes/login.routes";


const app = express();
const bodyParser = require('body-parser');;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
var getCors = cors()

// // Middlewares
// app.use(morgan("dev"));
// app.use(express.json());

// Routes
app.use(getCors)
app.use("/api/clients", clients);
app.use("/api/login", login);


export default app;

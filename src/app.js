import express from "express";
import parse from "body-parser";
 import cors from "cors";
// import morgan from "morgan";

// Routes
import salesRoutes from "./routes/sales.routes";
import clientsRoutes from "./routes/clients.routes";
import contractsRoutes from "./routes/contracts.routes";
import creditsRoutes from "./routes/credits.routes";
import creditnoteRoutes from "./routes/creditnote.routes";
import debitnoteRoutes from "./routes/debitnote.routes";
import personal from "./routes/personal.routes";
import upload from "./routes/upload.routes";
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
app.use("/api/clients", clientsRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/contracts", contractsRoutes);
app.use("/api/credits", creditsRoutes);
app.use("/api/creditnote", creditnoteRoutes);
app.use("/api/debitnote", debitnoteRoutes);
app.use("/api/personal", personal);
app.use("/api/upload", upload);
app.use("/api/login", login);


export default app;

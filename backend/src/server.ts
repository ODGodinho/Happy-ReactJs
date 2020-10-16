import express from "express";
import path from "path";
import cors from "cors";
import "express-async-errors";

import routes from "./routes";
import "../database/connection";
import errorHandler from "../Exceptions/Handler";


const app = express();

// habilita o uso de Json no express
app.use(express.json());
app.use(routes);
app.use(errorHandler)
app.use(cors())

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.listen(3333);
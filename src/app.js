import express from "express";
import routes from "./routes/index.js";

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/v1", routes);

export default app;

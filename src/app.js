import express from "express";
import routes from "./routes/index.js";
import pageNotFound from "./utils/pageNotFound.js";

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/v1", routes);

// page not found
app.use("*", pageNotFound);

export default app;

import http from "http";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./config/db.config.js";
import { globalErrorHandle } from "./middlewares/index.js";

// database
dbConnect();

// global error handler middleware
app.use(globalErrorHandle);

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(PORT, console.log(`Server is up and running on ${PORT}`));

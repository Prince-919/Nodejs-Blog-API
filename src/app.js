import express from "express";
import routes from "./routes/index.js";
import pageNotFound from "./utils/pageNotFound.js";
import { PostModel } from "./models/index.js";

const app = express();

// middleware
app.use(express.json());

// Home page
app.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    res.json(error);
  }
});

// routes
app.use("/api/v1", routes);

// page not found
app.use("*", pageNotFound);

export default app;

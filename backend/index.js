import express from "express";
import cors from "cors";
import { connectDB } from "./dbConfig/dbCollections.js";
import router from "./routes/index.js";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World! My name is Malesh.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDB();
});

import express from "express";
import Database from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(express.json());

// connect DB
Database.connect();

// routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

import express from "express";
import ProductController from "../controllers/ProductController.js";

const router = express.Router();

router.get("/", (req, res) => ProductController.getProducts(req, res));
router.get("/:id", (req, res) => ProductController.findProduct(req, res));
router.post("/", (req, res) => ProductController.createProduct(req, res));
router.put("/:id", (req, res) => ProductController.updateProduct(req, res));
router.delete("/:id", (req, res) => ProductController.deleteProduct(req, res));

export default router;

import Product from "../models/Product.js";
import { BaseController } from "./BaseController.js";

export class ProductController extends BaseController {
  async getProducts(req, res) {
    try {
      const products = await Product.get();
      return this.successResponse(res, products, "Products retrieved successfully");
    } catch (error) {
      return this.errorResponse(res, error.message);
    }
  }
  //find product by id
  async findProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.find(id);

      if (!product) {
        return this.errorResponse(res, "Product not found", 404);
      }

      return this.successResponse(res, product, "Product retrieved successfully");
    } catch (error) {
      return this.errorResponse(res, error.message, 500);
    }
  }
 //create new product
  async createProduct(req, res) {
    try {
      const { product_id, product_name, product_price } = req.body;

      if (!product_name) {
        return this.errorResponse(res, "product_name is required", 400);
      }

      if (product_price == null) {
        return this.errorResponse(res, "product_price is required", 400);
      }

      const newProduct = await Product.create({ product_id, product_name, product_price });
      return this.successResponse(res, newProduct, "Product created successfully", 201);
    } catch (error) {
      return this.errorResponse(res, error.message, 500);
    }
  }
 // update product by id
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { product_name, product_price } = req.body;

      if (!product_name) {
        return this.errorResponse(res, "product_name is required", 400);
      }

      if (product_price == null) {
        return this.errorResponse(res, "product_price is required", 400);
      }

      const result = await Product.update(id, { product_name, product_price });

      if (result.affectedRows === 0) {
        return this.errorResponse(res, "Product not found", 404);
      }

      return this.successResponse(res, null, "Product updated successfully");
    } catch (error) {
      return this.errorResponse(res, error.message, 500);
    }
  }

  //delete product by id

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const result = await Product.delete(id);

      if (result.affectedRows === 0) {
        return this.errorResponse(res, "Product not found", 404);
      }

      return this.successResponse(res, null, "Product deleted successfully");
    } catch (error) {
      return this.errorResponse(res, error.message, 500);
    }
  }
}

export default new ProductController();

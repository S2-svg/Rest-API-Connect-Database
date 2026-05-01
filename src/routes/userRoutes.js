import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.get("/", (req, res) => UserController.getUsers(req, res));
router.get("/:id", (req, res) => UserController.findUser(req, res));
router.post("/", (req, res) => UserController.createUser(req, res));
router.put("/:id", (req, res) => UserController.updateUser(req, res));
router.delete("/:id", (req, res) => UserController.deleteUser(req, res));

export default router;

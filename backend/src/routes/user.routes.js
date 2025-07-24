import express from "express";
import userControllers from "../controllers/user.controllers.js";
const router = express.Router();

router.get("/get-all-users", userControllers.getAllUsers);
router.get("/get-user/:id", userControllers.getUserById);
router.post("/create-user",  userControllers.createUser);
router.put("/update-user/:id",  userControllers.updateUser);
router.delete("/delete-user/:id", userControllers.deleteUser);

export default router;
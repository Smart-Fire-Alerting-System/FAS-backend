import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

/**
 * @openapi
 * tags: 
 *   name: User
 *   description: User management and authentication
 *  */


/**
 * @openapi
 * /api/user/register:
 *   post: 
 *     summary: Register new user
 *     tags: [User]
 *     requestBody:
 *       description: Add new user
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: 
 *       required: true   
 *  */

router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
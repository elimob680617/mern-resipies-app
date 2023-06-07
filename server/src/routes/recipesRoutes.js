import express from "express";
import {
  createNewRecipe,
  getRecipes,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getRecipes);
router.post("/create", createNewRecipe);

export default router;

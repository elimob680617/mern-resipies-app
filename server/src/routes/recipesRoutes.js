import express from "express";
import {
  createRecipe,
  getRecipes,
  saveRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getRecipes);
router.post("/create", createRecipe);
router.put("/", saveRecipe);
router.get("/savedRecipes/ids");

export default router;

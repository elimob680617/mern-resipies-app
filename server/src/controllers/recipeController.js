import Recipe from "../models/recipesModel.js";
import asyncHandler from "express-async-handler";

// @desc Get recipes
// route /api/recipes
// @access public
const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({});
  if (recipes) {
    res.status(200).json({ recipes });
  } else {
    res.status(404);
    throw new Error("Recipes not found");
  }
});

// @desc Add a new recipe
// route /api/recipes/create
// @access public
const createNewRecipe = asyncHandler(async (req, res) => {
  const { name, ingredients, instructions, imageUrl, cookieTime, userOwner } =
    req.body;

  const recipe = await Recipe.create({
    name,
    ingredients,
    instructions,
    imageUrl,
    cookieTime,
    userOwner,
  });
  if (recipe) {
    res.status(201).json({
      _id: recipe._id,
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      imageUrl: recipe.imageUrl,
      cookieTime: recipe.cookieTime,
      userOwner: recipe.userOwner,
    });
  } else {
    res.status(400);
    throw new Error("Invalid recipe data");
  }
});

export { getRecipes, createNewRecipe };

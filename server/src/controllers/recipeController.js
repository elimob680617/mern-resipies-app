import Recipe from "../models/recipesModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc Get recipes
// route Get /api/recipes
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
// route POST /api/recipes/create
// @access public
const createRecipe = asyncHandler(async (req, res) => {
  const { name, ingredients, instructions, imageUrl, cookingTime, userOwner } =
    req.body;

  const recipe = await Recipe.create({
    name,
    ingredients,
    instructions,
    imageUrl,
    cookingTime,
    userOwner,
  });
  if (recipe) {
    res.status(201).json({
      _id: recipe._id,
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      imageUrl: recipe.imageUrl,
      cookingTime: recipe.cookingTime,
      userOwner: recipe.userOwner,
    });
  } else {
    res.status(400);
    throw new Error("Invalid recipe data");
  }
});

// @desc save a recipe
// route PUT /api/recipes
// access private
const saveRecipe = asyncHandler(async (req, res) => {
  // find recipe by Id that we want to save
  const recipe = await Recipe.findById(req.recipe._id);
  const user = await User.findById(req.user._id);
  if (user && recipe) {
    user.savedRecipes.push(recipe);
    // save into our collection
    await user.save();
    res.status(200).json({
      savedRecipes: user.savedRecipes,
    });
  } else {
    res.status(404);
    throw new Error("Recipe not found");
  }
});

// @desc Get a list all of recipe IDs that the user whose logged in to at the moment have saved
// route /api/recipes/savedRecipes/ids
// access private

const getSavedRecipesById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      savedRecipes: user?.savedRecipes,
    });
  } else {
    res.status(404);
    throw new Error("Recipe not found");
  }
});

// @desc Get saved recipes
// route /api/recipes/savedRecipes
// access private

const getSavedRecipes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const savedRecipes = await Recipe.find({
    _id: { $in: user.savedRecipes },
  });
  if (user && savedRecipes) {
    res.status(200).json({
      savedRecipes: user?.savedRecipes,
    });
  } else {
    res.status(404);
    throw new Error("Recipe not found");
  }
});

export {
  getRecipes,
  createRecipe,
  saveRecipe,
  getSavedRecipesById,
  getSavedRecipes,
};

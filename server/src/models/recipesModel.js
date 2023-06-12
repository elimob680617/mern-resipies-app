import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  // structure each recipe data
  // the name of the food
  name: { type: String, require: true },
  // multiple ingredients insode of recipe so represent an array of string wrap this around with [] to make mongoDB will know this is array of string
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  imageUrl: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  // reference between a recipe and who create a recipe , to keep track who create the recipe
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
});

const Recipe = mongoose.model("Recipes", recipeSchema);
export default Recipe;

import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import recipesRouter from "./routes/recipesRoutes.js";

import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.get("/", (req, res) => res.send("Server is ready"));

// **POST /api/users - Register a user
// **POST /api/users/auth** - Authenticate a user and get token
// **POST /api/users/logout** - Logout user and clear token
// **GET /api/users/profile** - Get user Profile
// **PUT /api/user/profile** - Update profile

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.use(cookieParser());

app.use("/api/users", userRouter);

// **POST /api/recipes/create** - LCreate Recipe
// **GET /api/recipes** - Get Recipes

app.use("/api/recipes", recipesRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port : ${port}`));

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRouter from "./routes/userRoutes.js";

import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => res.send("Server is ready"));

// **POST /api/users - Register a user
// **POST /api/users/auth** - Authenticate a user and get token
// **POST /api/users/logout** - Logout user and clear token
// **GET /api/users/profile** - Get user Profile
// **PUT /api/user/profile** - Update profile

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);

// mongoose.connect(
//   "mongodb+srv://elhamobini:gq6FqASiwe4Pbbiy@recipes.ymkrhuc.mongodb.net/recipes?retryWrites=true&w=majority"
// );

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port : ${port}`));

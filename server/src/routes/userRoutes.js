import express from "express";
import {
  authUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;

// router.post("/register", async (req, res) => {
//   const { username, password } = req.body;

//   const user = await UserModel.findOne({ username });

//   if (user) {
//     return res.json({ message: "User already exist!" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new UserModel({
//     username: username,
//     password: hashedPassword,
//   });

//   await newUser.save();

//   res.json({ message: "User Registered Successfully" });
// });

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   const user = await UserModel.findOne({ username });

//   if (!user) {
//     return res.json({ message: "User doesn't exist!" });
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     return res.json({ message: "Username or Password is Incorrect!" });
//   }

//   const token = jwt.sign({ id: user._id }, "secret");

//   res.json({ token, userId: user._id });
// });

// export { router as userRouter };

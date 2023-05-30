// to get the payload from the token which is the userId by Verify method that will verify the token and enable us to get the decoded payload information
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// the middleware to protect routes >>> you have to be logged in to access that routes
const protect = asyncHandler(async (req, res, next) => {
  let token;
  // get the token which I called jwt we're allowed to do this because of the cookie parser i installed
  token = req.cookies.jwt;

  // check for the token basically we check for the cookie
  if (token) {
    try {
      // that decode object have userId in it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      /* ultimate goal here is to set req.user to the user of the token because this req.user we can access from any routes!!
       The reason the userId is there is because when we generate the token we passed in the userId ass a payload and now we get the user! And decoded will also include the password and we pass in a string of '-password'to make it the password doesn't get returned */
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized , invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized , no token");
  }
});

export { protect };

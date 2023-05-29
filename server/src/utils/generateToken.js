import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // generate a token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // save token in a cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    // prevent csrf attacks
    sameSite: "strict",
    // when does this expire
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;

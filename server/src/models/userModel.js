import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// is matched that password to the hashed password??

userSchema.methods.matchPassword = async function (enteredPassword) {
  // returned true or false based on if the entered password matches with the hasshed password in the database
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("Users", userSchema);

export default User;

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");

exports.register = async (req, res, next) => {
  const { name, email, password, role, address } = req.body;
  const user = await User.findOne({ email: email.trim().toLowerCase() });
  if (user) {
    return res.status(400).json({ msg: "user already exist" });
  }
  const hashed = await bcrypt.hash(password, 10);
  const created = await User.create({
    name,
    email,
    address,
    password: hashed,
    role,
  });
  res.json(created);
};

exports.login = async (req, res, next) => {
  console.log("hlo login");
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.trim().toLowerCase() });
  if (!user) {
    return res.status(400).json({ msg: "user not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "wrong password" });
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: "1h" },
  );
  res.json({ token, user });
};

exports.edit_myprofile = async (req, res, next) => {
  const updated = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });
  res.json(updated);
};

exports.myprofile = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

exports.profileById = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

exports.forgotPass = async (req, res, next) => {
  console.log("hlo forgot");
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const token = crypto.randomBytes(20).toString("hex");
    console.log(token);
    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000;

    await user.save();
    const resetLink = `https://local-pro-one.vercel.app/reset-password/${token}`;

    console.log(resetLink);
    await sendMail(
      user.email,
      "Password Reset - LocalPro",
      `Click here to reset password: ${resetLink}. This link is valid for 10 min.`,
    );
    console.log("hlo forgot end");
    res.json({ msg: "Reset link sent to your email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.resetPass = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }
    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res
      .status(200)
      .json({ msg: "Password reset successful! You can now login." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

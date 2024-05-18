const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_KEY = "asldkfjaklsfjsldk;fj"
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({ success: false, message: "User already exists!" });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      email: email,
      password: hashedPassword,
      username: username,
    });
    return res.status(201).send({ success: true, user });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error signing up!", error: error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).send({ success: false, message: "User not found" });
    }

    const passwordMatched = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatched) {
      return res.status(400).send({ success: false, message: "Wrong password" });
    }

    const jwtToken = jwt.sign(
      { _id: existingUser._id, email: existingUser.email },
      JWT_KEY,
      { expiresIn: '24h' } // Set expiration time as needed
    );

    res.cookie("token", jwtToken, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).send({ success: true, message: "Login successful", existingUser, jwtToken });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error log in!", error });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).send({ message: "logged out successfully!" });
  } catch (error) {
    return res.status(500).send({ message: "Error logging out!", error });
  }
};

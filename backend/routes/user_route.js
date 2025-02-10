const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const requireAuth = require("../middleware/auth");
require("dotenv").config(); // Load environment variables

const maxAge = 3 * 24 * 60 * 60*1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

// 🔹 Secure Login with POST
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let currentUser = await User.findOne({ email });

    if (!currentUser) return res.status(400).json({ error: "Invalid email" });

    const validPassword = await bcrypt.compare(password, currentUser.password);
    if (!validPassword) return res.status(400).json({ error: "Wrong password" });

    const token = createToken(currentUser._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({user: currentUser,token:token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Update User
router.put("/update",requireAuth, async (req, res) => {
  try {
    let updatedUser = await User.findByIdAndUpdate(
      req.userId,
      req.body,
      { new: true }  // Ensure the response contains updated user data
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete User
router.delete("/delete/:id", async (req, res) => {
  try {
    let result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Add New User (Registration)
router.post("/add", async (req, res) => {
  try {
    let data = req.body;
    console.log("signup :",data)
    // Hash Password
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    let user = new User(data);
    let result = await user.save();
    res.status(201).json({result:result});
  } catch (error) {
    console.error(error);
    res.status(403).json({ error: "Could not register user" });
  }
});

// 🔹 Get All Users
router.get("/", async (req, res) => {
  try {
    let allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get One User
router.get("/profile", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Exclude password
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("jwt", { httpOnly: true });
  console.log("logout")
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;

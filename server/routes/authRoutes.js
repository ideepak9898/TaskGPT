const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

// GET endpoint for /api/auth
router.get("/", (req, res) => {
  res.json({ message: "Auth routes are working" });
});

// Match frontend calls
router.post("/register", signup);
router.post("/login", login);

module.exports = router;
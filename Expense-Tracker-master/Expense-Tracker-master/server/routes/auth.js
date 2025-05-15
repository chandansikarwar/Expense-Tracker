const express = require("express");
const router = express.Router();
const {
  registerUser,
  requestOTP,
  verifyOTP,
  loginUser,
  logout,
  authMiddleware,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/request-otp", requestOTP);
router.post("/verify-otp", verifyOTP);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/check-auth", authMiddleware, (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Authenticated user!", user: req.user });
});

module.exports = router;

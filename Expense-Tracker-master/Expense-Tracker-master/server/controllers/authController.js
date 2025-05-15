const User = require("../models/User");
const { sendOTP } = require("../util/sendOtp");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// Register User
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const requestOTP = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Send generic error for both invalid email & password (security best practice)
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Verify password before generating OTP
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate & send OTP
    const result = await sendOTP(email);
    return res.status(200).json(result);
  } catch (error) {
    console.error("OTP Request Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error requesting OTP" });
  }
};

module.exports = { requestOTP };

// Verify OTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || Date.now() > user.otpExpiry) {
      return res.json({ success: false, message: "Invalid or expired OTP" });
    }

    // Mark OTP as verified
    user.isOtpVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error verifying OTP" });
  }
};

// Login User (Only after OTP verification)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    // Check if OTP was verified before allowing login
    if (!user.isOtpVerified) {
      return res.json({ success: false, message: "OTP not verified" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.json({ success: false, message: "Wrong password" });
    }

    // Generate JWT token
    const token = JWT.sign(
      { id: user._id, userName: user.userName, email: user.email },
      process.env.JWT_SK
    );

    res.cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: user.email,
        id: user._id,
        userName: user.userName,
      },
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Logout
const logout = (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logged out successfully!" });
};

// Authentication Middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized user!" });
  }

  try {
    const decode = JWT.verify(token, process.env.JWT_SK);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized user!" });
  }
};

module.exports = {
  registerUser,
  requestOTP,
  verifyOTP,
  loginUser,
  logout,
  authMiddleware,
};

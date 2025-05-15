const nodemailer = require("nodemailer");
const User = require("../models/User");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Function to generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Function to send OTP via email
const sendOTP = async (email) => {
  try {
    const otp = generateOTP();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

    // Update user with OTP
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { otp, otpExpiry, isOtpVerified: false }, // Reset OTP verification
      { new: true }
    );

    if (!updatedUser) {
      return { success: false, message: "User not found" };
    }

    // Email message
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: "Error sending OTP" };
  }
};

module.exports = { sendOTP };

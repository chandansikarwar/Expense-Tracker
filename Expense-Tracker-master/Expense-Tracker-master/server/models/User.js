const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Password is required for login
  otp: { type: String }, // OTP for temporary verification
  otpExpiry: { type: Date }, // Expiry time for OTP
  isOtpVerified: { type: Boolean, default: false }, // Track OTP verification
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

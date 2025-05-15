const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    title: { type: String, required: true, trim: true, maxLength: 50 },
    amount: { type: Number, required: true, trim: true, maxLength: 20 },
    type: { type: String, default: "income" },
    date: { type: Date, required: true, trim: true },
    category: { type: String, required: true, maxLength: 20, trim: true },
    description: { type: String, require: true, maxLength: 50, trim: true },
    image: {
      imageURL: { type: String },
      imagePublicID: { type: String }
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", IncomeSchema);

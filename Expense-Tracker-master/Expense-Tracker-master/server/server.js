const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/database");
const transactionRoute = require("./routes/transaction");
const authRoute = require("./routes/auth");
const cookieParser = require("cookie-parser");

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

//routes
app.use("/api/v1", transactionRoute);
app.use("/api/v1/auth", authRoute);

// server start
const startServer = () => {
  connectDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port http://127.0.0.1:${PORT}`);
  });
};

startServer();

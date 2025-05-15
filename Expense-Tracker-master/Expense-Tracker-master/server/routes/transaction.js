const {
  addIncome,
  getIncome,
  deleteIncome,
  downloadIncomePDF,
} = require("../controllers/income");
const {
  addExpense,
  getExpense,
  deleteExpense,
  downloadExpensePDF,
} = require("../controllers/expenses");
const { authMiddleware } = require("../controllers/authController");
const { upload } = require("../helpers/cloudinary");

const router = require("express").Router();

// Income routes (protected)
router.get("/get-income", authMiddleware, getIncome);
router.post(
  "/add-income",
  authMiddleware,
  upload.single("incomeImage"),
  addIncome
);
router.delete("/delete-income/:id", authMiddleware, deleteIncome);
router.get("/download-expense-pdf", authMiddleware, downloadExpensePDF);

// Expense routes (protected)
router.get("/get-expense", authMiddleware, getExpense);
router.post(
  "/add-expense",
  authMiddleware,
  upload.single("expenseImage"),
  addExpense
);
router.delete("/delete-expense/:id", authMiddleware, deleteExpense);
router.get("/download-income-pdf", authMiddleware, downloadIncomePDF);

module.exports = router;

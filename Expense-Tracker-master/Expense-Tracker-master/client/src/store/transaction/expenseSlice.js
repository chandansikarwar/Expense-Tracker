import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const initialState = {
  expense: [],
  isLoading: false,
  error: null,
};

// Get Token from Local Storage
const getToken = () => localStorage.getItem("token");

// Fetch Expenses (User-Specific)
export const fetchExpense = createAsyncThunk("expense/fetch", async () => {
  const response = await axios.get(`${BASE_URL}get-expense`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    withCredentials: true,
  });
  return response.data;
});

// Add Expense (User-Specific)
export const addExpense = createAsyncThunk(
  "expense/add",
  async (expenseData) => {
    const formData = new FormData();
    formData.append("title", expenseData.expenseTitle);
    formData.append("amount", Number(expenseData.expenseAmount));
    formData.append("date", expenseData.expenseDate.toISOString()); // keep it string if backend expects it that way
    formData.append("category", expenseData.expenseCategory);
    formData.append("description", expenseData.expenseDescription);
    formData.append("expenseImage", expenseData.expenseImage); // 👈 append image file

    console.log("expenseImage file:", expenseData.expenseImage); // Should be a File object

    const response = await axios.post(`${BASE_URL}add-expense`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return response.data;
  }
);

// Delete Expense (User-Specific)
export const deleteExpense = createAsyncThunk(
  "expense/delete",
  async ({ id, imagePublicID }) => {
    await axios.delete(`${BASE_URL}delete-expense/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      data: { imagePublicId: imagePublicID },
      withCredentials: true,
    });

    return id;
  }
);

// Download Expense PDF
export const downloadExpensePDF = createAsyncThunk(
  "expense/downloadPDF",
  async () => {
    const response = await axios.get(`${BASE_URL}download-expense-pdf`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      responseType: "blob", // Must be blob for file download
      withCredentials: true,
    });

    // Trigger the browser to download the PDF
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();

    return true;
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expense = action.payload;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expense.push(action.payload);
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expense = state.expense.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export default expenseSlice.reducer;

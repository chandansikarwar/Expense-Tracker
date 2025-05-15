import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "./transaction/incomeSlice";
import expenseReducer from "./transaction/expenseSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    income: incomeReducer,
    expense: expenseReducer,
  },
});

export default store;

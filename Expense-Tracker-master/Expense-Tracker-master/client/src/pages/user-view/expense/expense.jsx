import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addExpense,
  deleteExpense,
} from "../../../store/transaction/expenseSlice";
import {
  ExpenseFormControl,
  ExpenseFormInitials,
} from "../../../config/formFields";
import CommonForm from "../../../components/common/common-Form/commonForm";
import { ScrollArea } from "../../../components/ui/scroll-area";
import RecentHistory from "../../../components/user/recentHistory/recentHistory";
import { toast } from "react-hot-toast";
import { Button } from "../../../components/ui/button";
import { Download } from "lucide-react";
import { downloadExpensePDF } from "../../../store/transaction/expenseSlice";

const Expense = () => {
  const dispatch = useDispatch();
  const { expense } = useSelector((state) => state.expense);
  const [expenseFormData, setExpenseFormData] = useState(ExpenseFormInitials);

  function onHandleSubmit(e) {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill out all fields!");
      return;
    }
    dispatch(addExpense(expenseFormData));
    toast.success("Expense added successfully!");
    setExpenseFormData(ExpenseFormInitials); // Reset form after submission
  }

  const isFormValid = () => {
    return Object.values(expenseFormData).every((value) =>
      typeof value === "string" ? value.trim() !== "" : value !== ""
    );
  };

  const calculateTotal = (expenses) => {
    return expenses.reduce((total, item) => total + Number(item.amount), 0);
  };

  return (
    <>
      <div className="font-bold text-4xl m-4 text-gray-800">Expense</div>
      <div className="flex-1 bg-gray-100 rounded-lg p-6 m-4">
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold text-center ">
            Total:{" "}
            <span
              className={
                calculateTotal(expense) !== 0 ? "text-red-500" : "text-gray-700"
              }
            >
              &#x20B9; {calculateTotal(expense)}
            </span>
          </h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start mx-4 space-y-4 md:space-y-0">
        <div className="flex-1 bg-gray-100 shadow-md rounded-lg p-6 h-[452px]">
          <CommonForm
            handleSubmit={onHandleSubmit}
            buttonText={"Add Expense"}
            formControls={ExpenseFormControl}
            formData={expenseFormData}
            setFormData={setExpenseFormData}
            isButtonDisabled={false}
          />
        </div>

        <div className="flex-1 bg-gray-100 shadow-md rounded-lg p-6 mt-4 md:mt-0 md:ml-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4">Expense History</h2>
            <Button
              variant={"secondary"}
              className={"border-2"}
              onClick={() => dispatch(downloadExpensePDF())}
            >
              Download Expense {<Download />}
            </Button>
          </div>
          <ScrollArea className="h-[360px]">
            <RecentHistory
              transactions={expense}
              onDelete={({ id, imagePublicID }) => {
                dispatch(deleteExpense({ id, imagePublicID }));
                toast.success("Expense deleted successfully!");
              }}
              isIncome={false}
            />
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default Expense;

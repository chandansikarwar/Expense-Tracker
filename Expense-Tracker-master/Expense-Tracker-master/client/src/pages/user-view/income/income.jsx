import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addIncome,
  deleteIncome,
  downloadIncomePDF,
} from "../../../store/transaction/incomeSlice";
import { IncomeFormControl } from "../../../config/formFields";
import CommonForm from "../../../components/common/common-Form/commonForm";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { IncomeInitialFormState } from "../../../config/formFields";
import RecentHistory from "../../../components/user/recentHistory/recentHistory";
import { toast } from "react-hot-toast";
import { Button } from "../../../components/ui/button";
import { Download } from "lucide-react";

const Income = () => {
  const dispatch = useDispatch();
  const { income } = useSelector((state) => state.income);
  const [incomeFormData, setIncomeFormData] = useState(IncomeInitialFormState);

  function onHandleSubmit(e) {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill out all fields!");
      return;
    }
    // console.log(incomeFormData);
    dispatch(addIncome(incomeFormData));
    toast.success("Income added successfully!");
    setIncomeFormData(IncomeInitialFormState); // Reset form after submission
  }

  const isFormValid = () => {
    return Object.values(incomeFormData).every((value) =>
      typeof value === "string" ? value.trim() !== "" : value !== ""
    );
  };

  const calculateTotal = (expenses) => {
    return expenses.reduce((total, item) => total + Number(item.amount), 0);
  };

  return (
    <>
      <div className="font-bold text-4xl m-4 text-gray-800">Income</div>
      <div className="flex-1 bg-gray-100 rounded-lg p-6 m-4">
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold text-center ">
            Total:
            <span
              className={
                income.length === 0 ? "text-red-500" : "text-green-500"
              }
            >
              &#x20B9;{calculateTotal(income)}
            </span>
          </h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start mx-4 space-y-4 md:space-y-0">
        <div className="flex-1 bg-gray-100 shadow-md rounded-lg p-6 h-[452px]">
          <CommonForm
            handleSubmit={onHandleSubmit}
            buttonText="Add Income"
            formControls={IncomeFormControl}
            formData={incomeFormData}
            setFormData={setIncomeFormData}
          />
        </div>

        <div className="flex-1 bg-gray-100 shadow-md rounded-lg p-6 mt-4 md:mt-0 md:ml-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4">Income History</h2>
            <Button
              variant={"secondary"}
              className={"border-2"}
              onClick={() => dispatch(downloadIncomePDF())}
            >
              Download Income {<Download />}
            </Button>
          </div>
          <ScrollArea className="h-[360px]">
            <RecentHistory
              transactions={income}
              onDelete={({ id, imagePublicID }) => {
                dispatch(deleteIncome({ id, imagePublicID }));
                toast.success("Income deleted successfully!");
              }}
              isIncome={true}
            />
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default Income;

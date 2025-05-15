import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchIncome } from "../../../store/transaction/incomeSlice";
import { fetchExpense } from "../../../store/transaction/expenseSlice";
import { IndianRupee } from "lucide-react";

const MinMaxBox = () => {
  const dispatch = useDispatch();
  const { income } = useSelector((state) => state.income);
  const { expense } = useSelector((state) => state.expense);

  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(fetchIncome());
    dispatch(fetchExpense());
  }, [dispatch]);

  // Function to find min and max amounts
  const minMaxAmount = (items) => {
    if (!items.length) return { minAmount: 0, maxAmount: 0 };

    const amounts = items.map((item) => item.amount);
    return {
      minAmount: Math.min(...amounts),
      maxAmount: Math.max(...amounts),
    };
  };

  const { minAmount: minIncome, maxAmount: maxIncome } = minMaxAmount(income);
  const { minAmount: minExpense, maxAmount: maxExpense } =
    minMaxAmount(expense);

  const minMaxData = [
    { title: "Income", minValue: minIncome, maxValue: maxIncome },
    { title: "Expense", minValue: minExpense, maxValue: maxExpense },
  ];

  return (
    <div className="p-3 w-full">
      <ul className="space-y-6">
        {minMaxData.length ? (
          minMaxData.map((singleItem, index) => (
            <li key={index}>
              <div className="flex items-center justify-between w-full text-gray-700 text-lg font-bold">
                Min{" "}
                <span className="text-lg font-bold">{singleItem.title}</span>{" "}
                Max
              </div>
              <div className="bg-white border shadow-md rounded-xl p-2.5 flex justify-between items-center w-full mt-1">
                <p className="font-normal flex items-center text-orange-300 text-lg">
                  <IndianRupee size={"20px"} strokeWidth={"3px"} />{" "}
                  {singleItem.minValue}
                </p>
                <p className="font-normal flex items-center text-orange-300 text-lg">
                  <IndianRupee size={"20px"} strokeWidth={"3px"} />
                  {singleItem.maxValue}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p className="flex justify-center text-red-500">No Data Available</p>
        )}
      </ul>
    </div>
  );
};

export default MinMaxBox;

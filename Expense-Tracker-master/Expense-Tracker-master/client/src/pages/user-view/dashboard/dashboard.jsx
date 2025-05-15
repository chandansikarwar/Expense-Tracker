import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecentHistory from "../../../components/user/recentHistory/recentHistory";
import AmountBoxes from "../../../components/user/amountBoxes/amountBoxes";
import MinMaxBox from "../../../components/user/minMaxBox/minMaxBox";
import TransactionChart from "../../../components/user/transactionChart/transactionChat";
import { fetchIncome } from "../../../store/transaction/incomeSlice";
import { fetchExpense } from "../../../store/transaction/expenseSlice"; // Make sure this action exists

const Dashboard = () => {
  const dispatch = useDispatch();
  const { income } = useSelector((state) => state.income);
  const { expense } = useSelector((state) => state.expense);

  useEffect(() => {
    dispatch(fetchIncome());
    dispatch(fetchExpense());
  }, [dispatch]); // Runs only when the component mounts

  return (
    <>
      <div className="font-bold text-4xl m-4 text-gray-800">Dashboard</div>
      <div className="flex flex-col gap-4 m-4">
        <div className="flex flex-row gap-4">
          <div className="flex-1 bg-gray-100 rounded-lg shadow-md p-6 flex justify-center items-center">
            <TransactionChart income={income} expense={expense} />
          </div>

          <div className="flex-1 bg-gray-100 rounded-lg shadow-md p-6 h-max-[240px]">
            <h2 className="text-lg font-medium mb-4">Recent History</h2>
            <RecentHistory isDashboard={true} />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex-1 bg-gray-100 rounded-lg shadow-md p-5 flex justify-center items-center gap-5">
            <AmountBoxes />
          </div>

          <div className="flex-1 bg-gray-100 rounded-lg shadow-md p-4 flex flex-col justify-center items-center space-y-6">
            <MinMaxBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

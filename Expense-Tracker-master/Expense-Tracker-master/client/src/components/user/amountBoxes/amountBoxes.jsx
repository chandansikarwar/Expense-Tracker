import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchIncome } from "../../../store/transaction/incomeSlice";
import { fetchExpense } from "../../../store/transaction/expenseSlice";
import { IndianRupee } from "lucide-react";

const AmountBoxes = () => {
  const dispatch = useDispatch();
  const { income } = useSelector((state) => state.income);
  const { expense } = useSelector((state) => state.expense);

  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(fetchIncome());
    dispatch(fetchExpense());
  }, [dispatch]);

  // Function to calculate total income/expense
  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.amount, 0);

  const boxData = [
    {
      title: "Total Income",
      content: calculateTotal(income),
      type: "income",
    },
    {
      title: "Total Expense",
      content: calculateTotal(expense),
      type: "expense",
    },
    {
      title: "Total Balance",
      content: calculateTotal(income) - calculateTotal(expense),
      type: "balance",
    },
  ];

  return (
    <>
      {boxData.map((singleBox, index) => (
        <div
          key={index}
          className="w-40 h-30 p-4 bg-white shadow-md rounded-xl"
        >
          <p className="text-xl font-medium text-center">
            {singleBox.title}
            <br />
            <span
              className={`flex justify-center align-middle mt-6 text-2xl items-center 
                ${
                  singleBox.type === "income"
                    ? "text-green-500"
                    : singleBox.type === "balance"
                    ? "text-sky-500"
                    : "text-red-500"
                }`}
            >
              <IndianRupee size={"20px"} strokeWidth={"3px"} />
              {singleBox.content}
            </span>
          </p>
        </div>
      ))}
    </>
  );
};

export default AmountBoxes;

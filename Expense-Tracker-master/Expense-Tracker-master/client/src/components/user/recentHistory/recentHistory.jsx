/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncome } from "../../../store/transaction/incomeSlice";
import { fetchExpense } from "../../../store/transaction/expenseSlice";
import { FaTrash, FaCalendarDays, FaPlus, FaMinus } from "react-icons/fa6";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea from shadCN
import iconMapping from "../../../util/iconMap";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IndianRupee, ReceiptText } from "lucide-react";

const RecentHistory = ({
  onDelete = null,
  isIncome = false,
  isDashboard = false,
}) => {
  const [imgLoading, setImgLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIncome());
    dispatch(fetchExpense());
  }, [dispatch]);

  const income = useSelector((state) => state.income?.income || []);
  const expense = useSelector((state) => state.expense?.expense || []);

  let transactions = isIncome ? income : expense;

  // Merge and sort by date for dashboard
  if (isDashboard) {
    transactions = [...income, ...expense].sort(
      (a, b) => new Date(b.date) - new Date(a.date) // Latest first
    );
  }

  return isDashboard ? (
    <div className="p-4 w-full">
      <ScrollArea className="h-50 w-full rounded-md  p-4">
        <ul className="space-y-4">
          {transactions.length ? (
            transactions.map((transaction) => (
              <li
                key={transaction._id}
                className="flex justify-between items-center bg-white shadow-sm rounded-lg p-4 space-x-4"
              >
                <div className="flex justify-between items-center w-full">
                  <div
                    className={`font-bold text-lg ${
                      income.some((t) => t._id === transaction._id)
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.title || "Unknown Title"}
                  </div>
                  <div
                    className={`font-bold text-lg flex items-center ${
                      income.some((t) => t._id === transaction._id)
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {income.some((t) => t._id === transaction._id) ? (
                      <FaPlus className="mr-1" />
                    ) : (
                      <FaMinus className="mr-1" />
                    )}
                    <IndianRupee
                      size={"20px"}
                      strokeWidth={"3px"}
                      className="mr-1"
                    />
                    {transaction.amount !== undefined
                      ? transaction.amount
                      : "N/A"}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="flex justify-center text-red-500 align-middle">
              No Recent History
            </p>
          )}
        </ul>
      </ScrollArea>
    </div>
  ) : (
    <ul className="space-y-4">
      {transactions.length ? (
        transactions.map((transaction) => (
          <li
            key={transaction._id}
            className="flex justify-between items-center bg-white shadow-sm rounded-lg p-4 space-x-4"
          >
            <div className="flex justify-center items-center w-12 h-12 bg-gray-200 rounded-lg">
              <span className="text-lg">
                {iconMapping[transaction.category] || "❓"}
              </span>
            </div>

            <div className="flex flex-col flex-grow mx-4">
              <div className="font-bold text-lg">
                {transaction.title || "Unknown"}
              </div>
              <div className="flex gap-10 items-center">
                <div
                  className={`text-gray-600 flex items-center ${
                    isIncome ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <IndianRupee size={"20px"} strokeWidth={"3px"} />
                  {transaction.amount !== undefined
                    ? transaction.amount
                    : "N/A"}
                </div>
                <div className="text-gray-600 flex items-center">
                  <FaCalendarDays />
                  {transaction.date
                    ? new Date(transaction.date).toLocaleDateString()
                    : "No Date"}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="bg-slate-500 text-white hover:text-white hover:bg-slate-700 border border-slate-500 focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                    <ReceiptText size={18} />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{`${transaction.type} Details`}</DialogTitle>
                    <DialogDescription>
                      <div className="space-y-4 text-sm text-gray-700">
                        {/* Title */}
                        <div>
                          <p className="font-semibold text-base">Title:</p>
                          <p>{transaction.title || "No Title"}</p>
                        </div>
                        {/* Amount */}
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold text-base">
                            {transaction.type} Amount:
                          </p>

                          <div className="flex items-center gap-2">
                            <IndianRupee
                              size={"20px"}
                              strokeWidth={"3px"}
                              className="text-green-600"
                            />
                            <span className="font-medium">
                              {transaction.amount !== undefined
                                ? transaction.amount
                                : "N/A"}
                            </span>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold text-base">Date:</p>
                          <div className="flex items-center gap-2">
                            <FaCalendarDays className="text-blue-500" />
                            <span>
                              {transaction.date
                                ? new Date(
                                    transaction.date
                                  ).toLocaleDateString()
                                : "No Date"}
                            </span>
                          </div>
                        </div>

                        {/* Image */}
                        <div className="flex flex-col gap-2">
                          <p className="font-semibold text-base">
                            Receipt/Image:
                          </p>
                          {transaction.image ? (
                            <div className="text-center space-y-2">
                              {imgLoading && (
                                <Skeleton className="mx-auto w-[200px] h-[150px] rounded-lg" />
                              )}

                              <img
                                src={transaction.image?.imageURL}
                                alt="Transaction"
                                className={`mx-auto border border-gray-300 rounded-lg max-h-48 object-contain transition-opacity duration-300 ${
                                  imgLoading ? "opacity-0" : "opacity-100"
                                }`}
                                onLoad={() => setImgLoading(false)}
                              />
                            </div>
                          ) : (
                            <p className="text-gray-500 italic">
                              No image provided
                            </p>
                          )}
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold text-base">
                            Description:
                          </p>
                          <p>
                            {transaction.description ||
                              "No description available"}
                          </p>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <button
                onClick={() =>
                  onDelete({
                    id: transaction._id,
                    imagePublicID: transaction.image.imagePublicID,
                  })
                }
                type="button"
                className="text-white border border-red-400 bg-red-400 hover:bg-red-500 hover:border-red-500 hover:text-white focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
              >
                {/* {console.log(
                  "TID:",
                  transaction._id,
                  "IPID:",
                  transaction.image.imagePublicID
                )} */}
                <FaTrash size={17} />
              </button>
            </div>
          </li>
        ))
      ) : (
        <p className="flex justify-center text-red-500 align-middle">
          {isIncome
            ? "No income records available."
            : "No expense records available."}
        </p>
      )}
    </ul>
  );
};

export default RecentHistory;

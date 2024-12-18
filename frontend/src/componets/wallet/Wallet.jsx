import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_wallet_data } from "../../store/reducers/dashboardReducer";

const Wallet = () => {
  const dispatch = useDispatch();

  const transactions = [
    { id: 1, date: "2024-12-10", description: "Salary Credit", amount: 1500 },
    {
      id: 2,
      date: "2024-12-11",
      description: "Grocery Shopping",
      amount: -120,
    },
    { id: 3, date: "2024-12-12", description: "Electricity Bill", amount: -60 },
    { id: 4, date: "2024-12-13", description: "Online Purchase", amount: -300 },
  ];

  const { userInfo } = useSelector((store) => store.authUser);
  const { walletBalance, walletTransactions } = useSelector(
    (store) => store.dashboard
  );

  useEffect(() => {
    dispatch(get_wallet_data(userInfo.id));
  }, [dispatch, userInfo]);

  return (
    <div className="min-h-screen  px-6">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Wallet</h1>
      </div>

      {/* Balance Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-medium">Current Balance</h2>
        <p className="text-2xl font-extrabold text-green-600 mt-2">
          ₹{walletBalance.toFixed(2)}
        </p>
      </div>

      {/* Transaction History */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-medium">Transaction History</h2>
        <ul className="mt-4 divide-y divide-gray-300">
          {walletTransactions.map((txn) => {
            const { type, amount, description, orderId, createdAt, _id } = txn;
            return (
              <li
                key={_id}
                className="py-4 flex justify-between items-center text-gray-700"
              >
                <div>
                  <p className="font-semibold">{description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(createdAt).toLocaleString()}
                  </p>
                  {orderId && (
                    <p className="text-sm text-gray-500">order Id :{orderId}</p>
                  )}
                </div>
                <div
                  className={`font-semibold ${
                    type === "Debit" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  <p>{type}</p>
                </div>
                <div>
                  <p
                    className={`font-semibold ${
                      type === "Debit" ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {type === "Debit" ? "-" : "+"}₹{Math.abs(amount).toFixed(2)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Wallet;

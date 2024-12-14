import React from "react";

const Wallet = () => {
  const balance = 430.25; // Example balance
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Wallet</h1>
      </div>

      {/* Balance Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-medium">Current Balance</h2>
        <p className="text-2xl font-extrabold text-green-600 mt-2">
          ${balance.toFixed(2)}
        </p>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
          Add Funds
        </button>
      </div>

      {/* Transaction History */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-medium">Transaction History</h2>
        <ul className="mt-4 divide-y divide-gray-300">
          {transactions.map((txn) => (
            <li
              key={txn.id}
              className="py-4 flex justify-between items-center text-gray-700"
            >
              <div>
                <p className="font-semibold">{txn.description}</p>
                <p className="text-sm text-gray-500">{txn.date}</p>
              </div>
              <p
                className={`font-semibold ${
                  txn.amount < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {txn.amount < 0 ? "-" : "+"}${Math.abs(txn.amount).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Wallet;

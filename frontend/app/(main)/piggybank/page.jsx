"use client";

export default function PiggyBankPage() {
  const balance = 1000;
  const transactions = [
    { id: 1, name: "บานช่อ 1", amount: 300, paid: false },
    { id: 2, name: "บานช่อ 2", amount: 300, paid: true },
    { id: 3, name: "บานช่อ 3", amount: 300, paid: true },
    { id: 4, name: "บานช่อ 4", amount: 300, paid: false },
    { id: 5, name: "บานช่อ 5", amount: 300, paid: true },
    { id: 6, name: "บานช่อ 6", amount: 300, paid: false },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Header Background */}
      <div
        className="relative h-60 bg-cover bg-center rounded-b-3xl shadow-lg"
        style={{ backgroundImage: "url('/media/background.png')" }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 rounded-b-3xl" />

        {/* Glass title */}
        <div className="absolute top-6 w-full flex justify-center px-4">
          <div className="text-center text-white bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg border border-white/30 w-full">
            <p className="text-sm tracking-wide">กระปุกหมู</p>
            <h1 className="text-lg font-semibold">งานหนังสือ</h1>
            <p className="text-xs">สร้างโดยสมาคมคนรักหนังสือ</p>
          </div>
        </div>

        {/* Balance Circle */}
        <div className="absolute left-1/2 -bottom-18 transform -translate-x-1/2">
          <div className="w-44 h-44 rounded-full bg-white shadow-xl flex flex-col justify-center items-center border-4 border-blue-200 hover:scale-105 transition-transform duration-300">
            <p className="text-sm text-gray-500">เป้าหมาย</p>
            <p className="text-2xl font-bold text-green-600">
              ${balance.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="flex-1 mt-20 px-4 pb-6">
        <div className="bg-white rounded-2xl shadow-xl p-4 overflow-y-auto max-h-[60vh] border border-gray-100">
          <h2 className="text-gray-800 font-semibold mb-3 text-base">
            รายการออมเงิน
          </h2>
          {transactions.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-3 border-b last:border-b-0 hover:bg-gray-50 rounded-lg transition"
            >
              <p className="text-gray-800 font-medium">{item.name}</p>
              {item.paid ? (
                <span className="text-green-600 text-sm font-semibold bg-green-100 px-3 py-1 rounded-full">
                  จ่ายแล้ว
                </span>
              ) : (
                <span className="text-gray-800 text-sm font-semibold bg-gray-100 px-3 py-1 rounded-full">
                  ฿ {item.amount}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import UserMenu from "../../components/UserMenu";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock orders data - replace with your API
    const mockOrders = [
      {
        _id: "1",
        orderId: "#ORD-2026-001",
        total: 2499,
        status: "delivered",
        date: "2026-01-20",
        items: 3,
        tracking: "Track Order",
      },
      {
        _id: "2",
        orderId: "#ORD-2026-002",
        total: 1599,
        status: "shipped",
        date: "2026-01-22",
        items: 2,
        tracking: "Track Order",
      },
      {
        _id: "3",
        orderId: "#ORD-2026-003",
        total: 899,
        status: "pending",
        date: "2026-01-24",
        items: 1,
        tracking: "Processing",
      },
    ];
    setOrders(mockOrders);
    setLoading(false);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "emerald";
      case "shipped":
        return "blue";
      case "pending":
        return "orange";
      default:
        return "gray";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-600">
            Loading orders...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">
        {/* Sidebar */}
        <div className="w-64 sticky top-24 hidden lg:block">
          <UserMenu />
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Order History
            </h1>
            <p className="text-lg text-gray-300 mt-2">
              Track all your purchases and delivery status
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-32 h-32 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-white">📦</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                No Orders Yet
              </h2>
              <p className="text-white/70 mb-6">
                Your order history is empty. Start shopping!
              </p>
              <Link
                to="/"
                className="inline-block px-8 py-3 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold shadow-xl hover:scale-105 transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        Order {order.orderId}
                      </h3>
                      <p className="text-white/70">
                        {order.date} • {order.items} items
                      </p>
                    </div>
                    <span className="text-2xl font-bold text-emerald-400">
                      ₹{order.total.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span
                      className={`px-4 py-2 rounded-2xl font-semibold text-sm border ${
                        getStatusColor(order.status) === "emerald"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : getStatusColor(order.status) === "blue"
                            ? "bg-blue-100 text-blue-800 border-blue-300"
                            : "bg-orange-100 text-orange-800 border-orange-300"
                      }`}
                    >
                      {order.status}
                    </span>
                    <button className="px-6 py-2 rounded-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-all shadow-xl">
                      {order.tracking}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

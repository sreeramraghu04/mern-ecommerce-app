import React, { useContext, useState } from "react";
import AuthContext from "../../context/Authcontext";
import Cartcontext from "../../context/Cartcontext";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { auth } = useContext(AuthContext);
  const { cart, setCart } = useContext(Cartcontext);
  const [loading, setLoading] = useState({});

  //! Remove item from cart
  const removeCartItem = (pid) => {
    try {
      setLoading((prev) => ({ ...prev, [pid]: true }));
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item removed from cart");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prev) => ({ ...prev, [pid]: false }));
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += Number(item.price);
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen lg:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text mb-6">
            🛒 Shopping Cart
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Review your selected items before checkout
          </p>
        </div>

        {cart?.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-10 max-w-2xl mx-auto">
            <div className="w-32 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <span className="text-4xl text-gray-400">🛒</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              No items in your cart. Continue shopping to add products.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              ← Start Shopping
            </Link>
          </div>
        ) : (
          /* Cart Items + Summary */
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                  <h2 className="text-2xl font-bold text-white">
                    {cart.length} {cart.length === 1 ? "item" : "items"} in your
                    cart
                  </h2>
                </div>

                <div className="divide-y divide-gray-200">
                  {cart?.map((item) => (
                    <div
                      key={item._id}
                      className="p-8 hover:bg-gray-50 transition-all duration-200"
                    >
                      <div className="flex items-center gap-6">
                        {/* Product Image */}
                        <div className="relative">
                          <img
                            src={`http://localhost:5000/api/v1/product/get-product-image/${item._id}`}
                            alt={item.name}
                            className="w-28 h-28 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-200"
                          />
                          {item.shipping === "1" && (
                            <div className="absolute -top-2 -right-2 bg-emerald-500 text-white px-2 py-1 rounded-xl text-xs font-bold shadow-lg">
                              Free Shipping
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span>Stock: {item.stock}</span>
                            <span>•</span>
                            <span>Sold: {item.sold}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-black text-emerald-600">
                              ₹{item.price}
                            </span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeCartItem(item._id)}
                          disabled={loading[item._id]}
                          className="group relative p-4 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:from-red-600 hover:to-rose-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:scale-110 active:scale-95"
                        >
                          {loading[item._id] ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <>
                              <span className="text-xl group-hover:scale-110 transition-transform">
                                🗑️
                              </span>
                              <span className="ml-1">Remove</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  💰 Order Summary
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-700 font-semibold">
                      Subtotal ({cart.length} items):
                    </span>
                    <span className="text-2xl font-black text-gray-900">
                      {totalPrice()}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg text-gray-600">
                    <span>Free Shipping</span>
                    <span>₹0</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-gray-200 to-gray-300 my-4"></div>
                  <div className="flex justify-between text-3xl font-black text-emerald-600">
                    <span>Total:</span>
                    <span>{totalPrice()}</span>
                  </div>
                </div>

                {auth?.token ? (
                  <Link
                    to="/checkout"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-6 px-8 font-bold text-lg rounded-3xl shadow-2xl hover:shadow-3xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-wide"
                  >
                    Proceed to Checkout
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 px-8 font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-wide"
                  >
                    🔐 Login to Checkout
                  </Link>
                )}
              </div>
            </div>
            {/* Greeting */}
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-lg border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Hi, {auth?.user?.name || "Guest"} 👋
              </h3>
              <p className="text-gray-600">
                {auth?.token
                  ? "Ready to complete your purchase?"
                  : "Login to checkout securely"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

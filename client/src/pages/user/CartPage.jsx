import React, { useContext } from "react";
import AuthContext from "../../context/Authcontext";
import Cartcontext from "../../context/Cartcontext";

const CartPage = () => {
  const { auth } = useContext(AuthContext);

  const { cart, setCart } = useContext(Cartcontext);

  //! remove cart item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //! cart total price
  const totalPrice = () => {
    try {
      let total = 0;

      cart?.forEach((item) => {
        total += Number(item.price);
        /* total += (item.price); */
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
    <div className="bg-red-500 p-5">
      <h1 className="text-2xl font-bold">Cart page</h1>
      <div className="bg-white p-5 border">
        <div>
          <h1>{`Hi ${auth?.token && auth?.user?.name}`}</h1>
        </div>
        <div>
          <h2>
            {cart?.length
              ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"}`
              : " Your cart is empty"}
          </h2>
        </div>
        <div className="p-2 flex gap-10">
          {cart?.map((item, index) => (
            <div
              key={index}
              className="border p-5 hover:bg-gray-100 space-y-2 space-x-5"
            >
              <h1 className="text-red-500 font-semibold text-xl">{item.name}</h1>
              <p>{item.description.substring(0, 30)}</p>
              <p>price: {item.price}</p>
              <button
                className="bg-red-500 p-3 mt-3"
                onClick={() => removeCartItem(item._id)}
              >
                remove
              </button>
            </div>
          ))}
        </div>
        <div>
          <h1 className="text-red-500 font-semibold underline mb-2 text-2xl">cart summary</h1>
          <h3>Total : {totalPrice()}</h3>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

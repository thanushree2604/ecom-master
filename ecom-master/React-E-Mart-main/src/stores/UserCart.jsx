import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { useCart } from "./context/CartContext";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, ENV } from "../constant";

const UserCart = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, removeAllFromCart } = useCart();
  const [address, setAddress] = useState("");
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  const checkoutOrder = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (cartItems.length === 0) {
      alert("Cart is Empty");
      return;
    }
    if (!address || address === "") {
      alert("Please enter your address");
      return;
    }

    try {
      const { data } = await axios.post(
        `https://ecom-backend-six-xi.vercel.app/api/orders/confirm-order`,
        {
          products: cartItems,
          address,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      removeAllFromCart();
      setShowOrderConfirmation(true);
    } catch (error) {
      alert("Order failed");
    }
  };
  return (
    <>
      <Navbar />
      {showOrderConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Order Confirmed</h2>
            <p>
              Your order has been confirmed. You will receive a confirmation
              email shortly.
            </p>
            <button
              className="bg-zinc-950 text-white py-2 px-4 rounded mt-4"
              onClick={() => setShowOrderConfirmation(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div>
        <h2 className="y-cart">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="empty">Your Cart is Empty</p>
        ) : (
          <div className="w-full flex justify-between gap-20">
            <div className="w-fit">
              {cartItems.map((item) => {
                return (
                  <div className="cart-section">
                    <div className="cart-img">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="cart-details">
                      <h3>{item.product}</h3>
                      <h2>{item.price}</h2>
                      <h3>{item.model}</h3>
                    </div>
                    <button
                      className="removeBtn"
                      onClick={() => removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
            {/* calculate total */}
            <div className="flex-1 bg-white shadow-lg rounded-lg p-6 h-fit">
              <h2 className="text-xl font-bold mb-4">Billing Summary</h2>

              <div className="mb-4">
                <p className="text-gray-700">Number of Items:</p>
                <p className="text-lg font-semibold">{cartItems.length}</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-700">Payment Mode:</p>
                <p className="text-lg font-semibold">Cash on Delivery</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-700">Total Price:</p>
                <p className="text-lg font-semibold">
                  {cartItems.reduce(
                    (acc, curr) => acc + parseInt(curr.price),
                    0
                  )}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-gray-700">Delivery Address:</p>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your address"
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>

              <button
                className="w-full bg-zinc-950 text-white py-2 px-4 rounded hover:bg-zinc-700 transition duration-200"
                onClick={checkoutOrder}
              >
                Click to Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserCart;

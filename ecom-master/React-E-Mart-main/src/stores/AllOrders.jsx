import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import { BASE_URL, ENV } from "../constant";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://ecom-backend-six-xi.vercel.app/api/orders/fetch-orders`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        const { data } = response;
        setOrders(data.allProducts);
      } catch (error) {
        alert("Coudn't fetch orders");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <>
      <Navbar />
      <div className="w-full max-w-4xl mx-auto p-6">
        {loading && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
              <h2 className="ext-2xl font-bold text-center text-gray-800">
                Loading...
              </h2>
            </div>
          </div>
        )}
        {orders.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              All Orders
            </h2>
            <div className="grid sm:grid-cols-2 mt-6 w-full gap-4">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="w-full flex items-center border shadom-xl"
                >
                  <div className="cart-img">
                    <img src={order.image} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{order.product}</h3>
                    <h2>{order.price}</h2>
                    <h3>{order.model}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-xl font-bold mt-6">No Orders Found</p>
        )}
      </div>
    </>
  );
};

export default AllOrders;

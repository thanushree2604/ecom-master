import React, { createContext, useState, useEffect } from "react";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import LandingPage from "./stores/pages/LandingPage";
import Kitchen from "./stores/components/Kitchen";
import MobilePage from "./stores/pages/MobilePage";
import CompPage from "./stores/pages/CompPage";
import WatchPage from "./stores/pages/WatchPage";
import MenPage from "./stores/pages/MenPage";
import WomanPage from "./stores/pages/WomanPage";
import FurniturePage from "./stores/pages/FurniturePage";
import AcPage from "./stores/pages/AcPage";
import KitchenPage from "./stores/pages/KitchenPage";
import MobileSingle from "./stores/singles/MobileSingle";
import UserCart from "./stores/UserCart";
import FridgePage from "./stores/pages/FridgePage";
import ComputerSingle from "./stores/singles/ComputerSingle";
import FurnitureSingle from "./stores/singles/FurnitureSingle";
import KitchenSingle from "./stores/singles/KitchenSingle";
import AcSingle from "./stores/singles/AcSingle";
import MenSingle from "./stores/singles/MenSingle";
import WatchSingle from "./stores/singles/WatchSingle";
import WomanSingle from "./stores/singles/WomanSingle";
import FridgeSingle from "./stores/singles/FridgeSingle";
import Login from "./stores/components/Auth/Login";
import Register from "./stores/components/Auth/Register";
import AllOrders from "./stores/AllOrders";
import { BASE_URL, ENV } from "./constant";

export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);

  const checkUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { data } = await axios.get(
          `https://ecom-backend-six-xi.vercel.app/api/auth/verify-token`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setUser(data.user);
      } catch (err) {
        localStorage.removeItem("token");
        console.log(err);
      }
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/orders",
      element: <AllOrders />,
    },
    // {
    //   path: "/kitchen",
    //   element: <KitchenPage />,
    // },
    // {
    //   path: "/mobiles",
    //   element: <MobilePage />,
    // },
    // {
    //   path: "/computers",
    //   element: <CompPage />,
    // },
    {
      path: "/watch",
      element: <WatchPage />,
    },
    // {
    //   path: "/fridge",
    //   element: <FridgePage />,
    // },
    {
      path: "/men",
      element: <MenPage />,
    },
    {
      path: "/woman",
      element: <WomanPage />,
    },
    // {
    //   path: "/furniture",
    //   element: <FurniturePage />,
    // },
    // {
    //   path: "/ac",
    //   element: <AcPage />,
    // },
    // {
    //   path: "/mobiles/:id",
    //   element: <MobileSingle />,
    // },
    {
      path: "/cart",
      element: <UserCart />,
    },
    // {
    //   path: "/ac/:id",
    //   element: <AcSingle />,
    // },
    // {
    //   path: "/computers/:id",
    //   element: <ComputerSingle />,
    // },
    // {
    //   path: "/furniture/:id",
    //   element: <FurnitureSingle />,
    // },
    // {
    //   path: "/kitchen/:id",
    //   element: <KitchenSingle />,
    // },
    {
      path: "/men/:id",
      element: <MenSingle />,
    },
    {
      path: "/watch/:id",
      element: <WatchSingle />,
    },
    {
      path: "/woman/:id",
      element: <WomanSingle />,
    },
    // {
    //   path: "/fridge/:id",
    //   element: <FridgeSingle />,
    // },
    {
      path: "*",
      element: <h1 className="text-4xl text-center mt-20">Page Not Found</h1>,
    },
  ]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        {/* <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<AllOrders />} />
          <Route path="/kitchen" element={<KitchenPage />} />
          <Route path="/mobiles" element={<MobilePage />} />
          <Route path="/computers" element={<CompPage />} />
          <Route path="/watch" element={<WatchPage />} />
          <Route path="/fridge" element={<FridgePage />} />
          <Route path="/men" element={<MenPage />} />
          <Route path="/woman" element={<WomanPage />} />
          <Route path="/furniture" element={<FurniturePage />} />
          <Route path="/ac" element={<AcPage />} />
          <Route path="/mobiles/:id" element={<MobileSingle />} />
          <Route path="/cart" element={<UserCart />} />
          <Route path="/ac/:id" element={<AcSingle />} />
          <Route path="/computers/:id" element={<ComputerSingle />} />
          <Route path="/furniture/:id" element={<FurnitureSingle />} />
          <Route path="/kitchen/:id" element={<KitchenSingle />} />
          <Route path="/men/:id" element={<MenSingle />} />
          <Route path="/watch/:id" element={<WatchSingle />} />
          <Route path="/woman/:id" element={<WomanSingle />} />
          <Route path="/fridge/:id" element={<FridgeSingle />} />
        </Routes> */}
        <RouterProvider router={router} />
      </div>
    </UserContext.Provider>
  );
};

export default App;

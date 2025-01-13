import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { FaUserCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { BsCart4 } from "react-icons/bs";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { cartItems } = useCart();
  const [showLogout, setShowLogout] = useState(false);
  const logOut = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="navbar-section">
      <div className="navSection">
        <Link to="/" className="custom-link">
          <div className="title">
            <h2>E-Mart</h2>
          </div>
        </Link>

        <div className="search">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="user w-fit flex items-center gap-10">
          <Link to="/cart">
            <div className="cart flex items-center gap-2">
              <span>{cartItems.length}</span>
              <BsCart4 className="text-3xl" />
            </div>
          </Link>
          <div className="relative">
            {user ? (
              <div
                onClick={() => setShowLogout(!showLogout)}
                className="user-detail flex items-center gap-2 cursor-pointer relative"
              >
                {user.username}
                <FaUserCircle className="text-3xl" />
              </div>
            ) : (
              <Link to={"/login"} className="user-detail">
                SignIN/SignUp
              </Link>
            )}
            {showLogout && (
              <div className="flex flex-col gap-1 absolute top-9 right-1 p-2 bg-white rounded shadow-md">
                <Link to="/orders" className="bg-gray-800 text-white px-12 py-2 rounded">Orders</Link>
                <button
                  onClick={logOut}
                  className="bg-red-500 text-white px-12 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="subMenu">
        <ul>
          {/* <Link to="/mobiles" className="custom-link">
            <li>Mobiles</li>
          </Link>

          <Link to="/computers" className="custom-link">
            <li>Computers</li>
          </Link> */}

          <Link to="/watch" className="custom-link">
            <li>Watches</li>
          </Link>

          <Link to="/men" className="custom-link">
            <li>Mens Wear</li>
          </Link>

          <Link to="/woman" className="custom-link">
            <li>Woman Wear</li>
          </Link>

          {/* <Link to="/furniture" className="custom-link">
            <li>Furniture</li>
          </Link>

          <Link to="/kitchen" className="custom-link">
            <li>Kitchen</li>
          </Link>

          <Link to="/fridge" className="custom-link">
            <li>Fridge</li>
          </Link>
          <Link to="/" className="custom-link">
            <li>Books</li>
          </Link>

          <Link to="/" className="custom-link">
            <li>Speakers</li>
          </Link>

          <Link to="/" className="custom-link">
            <li>TV's</li>
          </Link>

          <Link to="/ac" className="custom-link">
            <li>AC</li>
          </Link> */}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

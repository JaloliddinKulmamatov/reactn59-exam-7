import "./App.css";
import callPng from "./assets/call-icon.svg";
import useFlag from "./assets/useFlag.svg";

import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Products from "./components/products/Products";
import Product from "./components/product/Product";
import { FaShoppingCart } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

import Cart from "./components/cart/Cart";
import Footer from "./components/footer/Footer";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div>
      <Router>
        <header>
          <div className="topic">
            <ul>
              <li className="topic__logo">
                <h1>GG</h1>
                <img src={callPng} alt="📞" />
                <p>+4904_049_950</p>
              </li>

              <li className="topic__shop">
                <p>Get 50% Off on the Selected items </p>
                <h1> | </h1>
                <p>Shop now</p>
              </li>

              <li className="topic__location">
                <span>
                  <select name="language" id="language">
                    <option value="English">English</option>
                  </select>
                  <img src={useFlag} alt="usa" />
                </span>
                <span>
                  <p>Location</p>
                  <TbWorld />
                </span>
              </li>
            </ul>
          </div>
          <nav className="navbar">
            <ul>
              <li>
                <h1>GameGeek</h1>
              </li>

              <li className="navLinks">
                <a href="#">Categorise</a>
                <a href="#">Brands</a>
                <NavLink
                  className={({ isActive }) => (isActive ? "activeLink" : "")}
                  to="/"
                >
                  Products
                </NavLink>
                <a href="#">Sales</a>
                <a href="#">Help</a>
                <a href="#">About</a>
              </li>

              <li>
                <NavLink to="/cart">
                  {cart.length > 0 && (
                    <span className="cart-count">{cart.length}</span>
                  )}
                  <div>
                    <FaShoppingCart />
                  </div>
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route
            path="/"
            element={<Products cart={cart} setCart={setCart} />}
          />
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart products={cart} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

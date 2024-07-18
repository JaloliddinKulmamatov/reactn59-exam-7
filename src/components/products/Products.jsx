import { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../store/productsSlice";
import { FaArrowUp } from 'react-icons/fa';
import Loading from "../loading/Loading";
import Notfounded from "../notfounded/Notfounded";

const baseURL = import.meta.env.VITE_BASE_URL;

const Products = ({ cart, setCart }) => {
  const products = useSelector((store) => store.productsReducer.products);
  const dispatch = useDispatch();
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [filters, setFilters] = useState({ brand: "", color: "" });
  const [sortOrder, setSortOrder] = useState("");
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${baseURL}/brands`);
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };

    const fetchColors = async () => {
      try {
        const response = await fetch(`${baseURL}/colors`);
        const data = await response.json();
        setColors(data);
      } catch (error) {
        console.error("Failed to fetch colors:", error);
      }
    };

    fetchBrands();
    fetchColors();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      let query = `${baseURL}/products`;

      const params = [];
      if (filters.color) {
        params.push(`color_options_like=${encodeURIComponent(filters.color)}`);
      }
      if (filters.brand) {
        params.push(`brand_name=${encodeURIComponent(filters.brand)}`);
      }

      if (params.length > 0) {
        query += `?${params.join("&")}`;
      }

      try {
        const response = await fetch(query);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPrices(
          data.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
          }))
        );
        dispatch(addProducts(data));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === "decrease") {
          return a.price - b.price;
        } else if (sortOrder === "increase") {
          return b.price - a.price;
        } 
  });

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };

  return (
    <div className={styles.container}>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <FaArrowUp />
        </button>
      )}
      <aside>
        <div>
          <h2>Sort by</h2>
          <select
            name="byPrice"
            id="byPrice"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Default</option>
            <option value="increase">Sort from expensive</option>
            <option value="decrease">Sort from cheap</option>
          </select>
        </div>
        <div>
          <h3>BRAND</h3>
          <ul>
            {brands.map((brand, index) => (
              <li key={index}>
                <input
                  type="radio"
                  value={brand}
                  name="brand"
                  id={brand}
                  checked={brand === filters.brand}
                  onChange={(e) => handleFilterChange("brand", e.target.value)}
                />
                <label htmlFor={brand}>{brand}</label>
              </li>
            ))}
          </ul>
          <button onClick={() => handleFilterChange("brand", "")}>Reset</button>
        </div>

        <div>
          <h3>COLORS</h3>
          <ul className={styles.colorsContainer}>
            {colors.map((color, index) => (
              <li key={index}>
                <div
                  style={{
                    background: color,
                    outline: filters.color === color ? "3px solid red" : "",
                  }}
                  className={styles.color}
                  onClick={() => handleFilterChange("color", color)}
                />
              </li>
            ))}
          </ul>
          <button onClick={() => handleFilterChange("color", "")}>Reset</button>
        </div>
      </aside>
      <main>
        {loading ? (
          <Loading />
        ) : products.length ? (
          <div className={styles.grid}>
            {sortedProducts.map((product) => (
              <Card
                key={product.id}
                product={product}
                cart={cart}
                setCart={setCart}
              />
            ))}
          </div>
        ) : (
          <Notfounded />
        )}
      </main>
    </div>
  );
};

export default Products;

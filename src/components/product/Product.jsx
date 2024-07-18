import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Product.module.scss";
import Button from "../button/Button";
import Loading  from "../loading/Loading";

import { ImStarEmpty } from "react-icons/im";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
  
const baseURL = import.meta.env.VITE_BASE_URL;

const Product = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductById() {
      try {
        const response = await fetch(`${baseURL}/products/${productId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProductById();
  }, [productId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {product && (
        <div className={styles.singleProduct}>
          <div className={styles.productTop}>
            <div className={styles.productTopBig}>
              <img src={product.image_url} alt={product.name} />
            </div>
            <div className={styles.productThumbnails}>
              <img src={product.image_url} alt={product.name} />
              <img src={product.image_url} alt={product.name} />
              <img src={product.image_url} alt={product.name} />
              <img src={product.image_url} alt={product.name} />
              <img src={product.image_url} alt={product.name} />
            </div>
          </div>
          <div className={styles.productBottom}>
            <div className={styles.productBottomTittle}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <span className={styles.productBottomRating}>
                <ImStarEmpty color="gold" />
                <ImStarEmpty color="gold" />
                <ImStarEmpty color="gold" />
                <ImStarEmpty color="gold" />
                <ImStarEmpty color="gold" />
                <p>({product.rating_counts})</p>
              </span>
            </div>
            <hr />
            <div className={styles.productBottomPrice}>
              <h4>
                ${product.price} or $
                {Math.floor(product.price * 0.3 * 100) / 100}/month
              </h4>
              <p>{product.description}</p>
            </div>
            <hr />
            <div className={styles.productBottomColor}>
              <h3>Choose color</h3>
              <div className={styles.colors}>
                {product.color_options.map((color, index) => (
                  <div
                    key={index}
                    style={{
                      background: color,
                    }}
                    className={styles.color}
                  />
                ))}
              </div>
            </div>
            <hr />
            <div className={styles.productBottomDelive}>
              <div className={styles.productBottomDeliveCount}>
                <div>
                  <button>+</button>
                  <button>1</button>
                  <button>-</button>
                </div>
                <p>
                  Only <strong>16 items</strong> left! <br /> Don't miss it{" "}
                </p>
              </div>
              <div className={styles.productBottomDeliveCart}>
                <Button>
                  <FaShoppingCart color="white" />
                  <span
                    style={{
                      marginLeft: "0.8em",
                      color: "#fff",
                      fontSize: "22px",
                    }}
                  >
                    Add to Cart
                  </span>
                </Button>
                <button className={styles.productBottomDeliveFavourite}>
                  <FaRegHeart />
                </button>
              </div>
              <div className={styles.productBottomDeliveWay}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;

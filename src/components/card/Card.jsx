import { FaCartShopping } from "react-icons/fa6";
import Button from "../button/Button";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";

const Card = ({ product,setCart,cart }) => {
  return (
    <div className={styles.cardMain}>
      <div className={styles.cardTop}>
        <img src={product.image_url} alt={product.product_name} />
      </div>
      <div className={styles.cardBottom}>
        <h4>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h4>
        <p>{product.description}</p>
        <div className={styles.colors}>
          {product.color_options.map((color, index) => (
            <div
              key={index}
              style={{ background: color }}
              className={styles.color}
            />
          ))}
        </div>
        <strong>{product.price}$</strong>
        <div>
          <Button onClick={() => setCart([...cart, product])}>
            <FaCartShopping color="white" />
            <span style={{ marginLeft: "0.8em", color: "#fff" }}>
              Add to Cart
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;

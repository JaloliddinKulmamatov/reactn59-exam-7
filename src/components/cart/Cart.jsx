import React from "react";
import styles from "./Cart.module.scss";
import Notfounded from "../notfounded/Notfounded";

const Cart = ({ products }) => {
  const calculateTotal = () => {
    return products
      .reduce((total, product) => total + product.price, 0)
      .toFixed(2);
  };

  return (
    <div className={styles.cartPage}>
      {products.length === 0 ? (
        <Notfounded />
      ) : (
        <>
          <div className={styles.cartContainer}>
            <h2>Shopping Cart</h2>
            <div className={styles.cartHeader}>
              <ul>
                <li>Product</li>
                <li>Quantity</li>
                <li>Price</li>
              </ul>
            </div>
            <ul>
              {products.map((p) => (
                <li key={p.id}>
                  <div className={styles.productDetails}>
                    <div className={styles.productInf}>
                      <img src={p.image_url} alt="Product" />
                      <span>
                        <h4>{p.name}</h4>
                        <p>{p.description}</p>
                      </span>
                    </div>
                    <div className={styles.productDetailsBtn}>
                      <button>-</button>
                      <button>1</button>
                      <button>+</button>
                    </div>
                    <div>
                      <span className={styles.price}>${p.price}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.cartTotals}>
            <h3>Cart Totals</h3>
            <div className={styles.totalsItem}>
              <span>Shipping (3-5 Business Days)</span>
              <span>Free</span>
            </div>
            <div className={styles.totalsItem}>
              <span>TAX (estimated for the United States (US))</span>
              <span>$0</span>
            </div>
            <div className={styles.totalsItem}>
              <span>Subtotal</span>
              <span>${calculateTotal()}</span>
            </div>
            <div className={styles.total}>
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>
            <button className={styles.checkoutButton}>
              Proceed to Checkout
            </button>
            <a href="/" className={styles.backToShopping}>
              &#8592; Back to Shopping
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

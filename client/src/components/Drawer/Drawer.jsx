import { useState } from "react";
import { useCart } from "../../hooks/useCart";

import { v4 as uuidv4 } from "uuid";

import axios from "axios";

import styles from "./Drawer.module.scss";
import CartItem from "../CartItem";
import CartInfo from "../CartInfo";

const Drawer = ({ onDeleteCartItem }) => {
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { cartItems, totalPrice, tax, cartClosedHandler, setCartItems } =
    useCart();

  const clearData = async (arr) => {
    for (let item of arr) {
      await axios.delete(`http://localhost:3001/cart/${item.id}`);
    }
  };

  const orderedHandler = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3001/orders", {
        id: uuidv4(),
        items: cartItems,
      });
      setOrderId(response.data.id);
      setCartItems([]);
      setIsOrdered(true);

      await clearData(cartItems);
    } catch (e) {
      alert("Не удалось оформить заказ, попробуйте позже :(");
    }
    setIsLoading(false);
  };

  const cartContent =
    cartItems.length > 0 ? (
      <>
        <div className={styles.items}>
          {cartItems.map((item) => {
            return (
              <CartItem
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onRemoveCartItem={onDeleteCartItem}
              />
            );
          })}
        </div>
        <div className={styles.cartTotal}>
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <strong>{totalPrice} грн.</strong>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <strong>{tax} грн.</strong>
            </li>
          </ul>
          <button
            className={
              isLoading ? `${styles.disabled} btnPrimary` : "btnPrimary"
            }
            onClick={orderedHandler}
          >
            Оформить заказ <img src="/images/arrow.svg" alt="Order" />
          </button>
        </div>
      </>
    ) : (
      <CartInfo
        title={
          isOrdered ? (
            <span style={{ color: "#87C20A" }}>Заказ оформлен!</span>
          ) : (
            "Корзина пустая"
          )
        }
        description={
          isOrdered ? (
            <span>
              Ваш заказ <strong>{orderId}</strong> скоро будет передан
              курьерской доставке
            </span>
          ) : (
            "Нам нужна хотя бы одна пара кроссовок, чтобы оформить заказ"
          )
        }
        image={
          isOrdered ? "/images/complete-order.jpg" : "/images/empty-cart.jpg"
        }
      />
    );

  return (
    <div className={styles.backdrop}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between align-center">
          Корзина
          <img
            onClick={cartClosedHandler}
            className="removeBtn cu-p"
            src="/images/btn-remove.svg"
            alt="Remove"
          />
        </h2>
        {cartContent}
      </div>
    </div>
  );
};

export default Drawer;

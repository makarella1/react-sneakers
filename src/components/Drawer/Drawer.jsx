import styles from "./Drawer.module.scss";
import CartItem from "../CartItem";

const Drawer = ({ items, onCartClosed, onDeleteCartItem }) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between align-center">
          Корзина
          <img
            onClick={onCartClosed}
            className="removeBtn cu-p"
            src="/images/btn-remove.svg"
            alt="Remove"
          />
        </h2>
        <div className={styles.items}>
          {items.map((item) => {
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
              <strong>9998 грн.</strong>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <strong>499</strong>
            </li>
          </ul>
          <button className="btnPrimary">
            Оформить заказ <img src="/images/arrow.svg" alt="Order" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;

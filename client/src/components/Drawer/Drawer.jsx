import styles from "./Drawer.module.scss";
import CartItem from "../CartItem";

const Drawer = ({ items, onCartClosed, onDeleteCartItem }) => {
  const cartContent =
    items.length > 0 ? (
      <>
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
      </>
    ) : (
      <div
        className={`${styles.cartEmpty} d-flex align-center justify-center flex-column flex`}
      >
        <img
          className="mb-20"
          width="120px"
          height="120px"
          src="/images/empty-cart.jpg"
          alt="Empty"
        />
        <h2>Корзина пустая</h2>
        <p className="opacity-6">
          Нам нужна хотя бы одна пара кроссовок, чтобы оформить заказ
        </p>
        <button
          onClick={onCartClosed}
          className={`${styles.btnPrimary} btnPrimary`}
        >
          <img src="/images/arrow.svg" alt="Arrow" />
          Вернуться назад
        </button>
      </div>
    );

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
        {cartContent}
      </div>
    </div>
  );
};

export default Drawer;

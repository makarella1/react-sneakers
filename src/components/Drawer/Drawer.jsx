import styles from "./Drawer.module.scss";

const Drawer = () => {
  return (
    <div className={styles.backdrop} style={{ display: "none" }}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between align-center">
          Корзина
          <img
            className="removeBtn cu-p"
            src="/images/btn-remove.svg"
            alt="Remove"
          />
        </h2>
        <div className={styles.items}>
          <div className={`${styles.cartItem} d-flex align-center mb-20`}>
            <div
              style={{
                backgroundImage: `url(/images/sneakers/2.jpg)`,
              }}
              className={styles.cartItemImg}
            ></div>
            <div className="flex">
              <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
              <strong>4999 грн.</strong>
            </div>
            <img
              className="removeBtn cu-p"
              src="/images/btn-remove.svg"
              alt="Remove"
            />
          </div>
          <div className={`${styles.cartItem} d-flex align-center mb-20`}>
            <div
              style={{
                backgroundImage: `url(/images/sneakers/2.jpg)`,
              }}
              className={styles.cartItemImg}
            ></div>
            <div className="flex">
              <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
              <strong>4999 грн.</strong>
            </div>
            <img
              className="removeBtn cu-p"
              src="/images/btn-remove.svg"
              alt="Remove"
            />
          </div>
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

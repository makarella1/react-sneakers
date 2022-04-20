import styles from "./Header.module.scss";

const Header = ({ onCartOpened }) => {
  return (
    <header
      className={`${styles.header} d-flex justify-between align-center p-40`}
    >
      <div className="d-flex align-center">
        <img width={40} height={40} src="/images/logo.png" alt="Logo" />
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className="d-flex">
        <li className={styles.cart} onClick={onCartOpened}>
          <img width={18} height={18} src="/images/cart.svg" alt="Cart" />
          <span>1205 грн.</span>
        </li>
        <li>
          <img width={18} height={18} src="/images/user.svg" alt="User" />
        </li>
      </ul>
    </header>
  );
};

export default Header;

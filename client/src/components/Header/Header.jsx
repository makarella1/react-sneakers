import { useCart } from "../../hooks/useCart";

import styles from "./Header.module.scss";

import { Link } from "react-router-dom";

const Header = ({ onCartOpened }) => {
  const { totalPrice } = useCart();

  return (
    <header
      className={`${styles.header} d-flex justify-between align-center p-40`}
    >
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/images/logo.png" alt="Logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className={styles.headerActions}>
        <li className={styles.cart} onClick={onCartOpened}>
          <img width={18} height={18} src="/images/cart.svg" alt="Cart" />
          <span>{totalPrice} грн.</span>
        </li>
        <Link to="/favorites">
          <li className={styles.cart}>
            <img
              width={18}
              height={18}
              src="/images/heart.svg"
              alt="Favorites"
            />
          </li>
        </Link>
        <Link to="/orders">
          <li className={styles.cart}>
            <img width={18} height={18} src="/images/user.svg" alt="User" />
          </li>
        </Link>
      </ul>
    </header>
  );
};

export default Header;

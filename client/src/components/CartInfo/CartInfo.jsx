import { useContext } from "react";
import Context from "../../context";
import styles from "./CartInfo.module.scss";

const CartInfo = ({ title, description, image }) => {
  const { cartClosedHandler } = useContext(Context);

  return (
    <div
      className={`${styles.cartInfo} d-flex align-center justify-center flex-column flex`}
    >
      <img className="mb-20" width="120px" src={image} alt="Empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button
        onClick={cartClosedHandler}
        className={`${styles.btnPrimary} btnPrimary`}
      >
        <img src="/images/arrow.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default CartInfo;

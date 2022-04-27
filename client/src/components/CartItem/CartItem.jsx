import styles from "./CartItem.module.scss";

const CartItem = ({ id, title, price, imageUrl, onRemoveCartItem }) => {
  const removeItemHandler = () => {
    onRemoveCartItem(id);
  };
  return (
    <div className={`${styles.cartItem} d-flex align-center mb-20`}>
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        className={styles.cartItemImg}
      ></div>
      <div className="flex">
        <p className="mb-5">{title}</p>
        <strong>{price}</strong>
      </div>
      <img
        onClick={removeItemHandler}
        className="removeBtn cu-p"
        src="images/btn-remove.svg"
        alt="Remove"
      />
    </div>
  );
};

export default CartItem;

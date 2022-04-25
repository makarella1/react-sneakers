import styles from "./Card.module.scss";
import Loader from "../UI/Loader";

const Card = ({
  title,
  price,
  imageUrl,
  id,
  onCartItemAdded,
  onAddedToFavorites,
  isInFavorites,
  isInCart,
  isLoading = false,
}) => {
  const addedHandler = () => {
    onCartItemAdded({ title, imageUrl, price, id });
  };

  const favoriteHandler = () => {
    onAddedToFavorites({ title, imageUrl, price, id });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={favoriteHandler}>
        <img
          src={isInFavorites ? "/images/liked.svg" : "/images/unliked.svg"}
          alt="Unliked"
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <strong>{price} грн.</strong>
        </div>
        <img
          onClick={addedHandler}
          className={styles.cart}
          width={32}
          height={32}
          src={isInCart ? "/images/checked.svg" : "/images/plus.svg"}
          alt="Plus"
        />
      </div>
    </div>
  );
};

export default Card;

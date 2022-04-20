import { useState } from "react";
import styles from "./Card.module.scss";

const Card = ({ title, price, imageUrl, id, onCartItemAdded }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const addedHandler = () => {
    setIsAdded(!isAdded);
    onCartItemAdded({ title, imageUrl, price, id });
  };

  const favoriteHandler = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={favoriteHandler}>
        <img
          src={isFavorite ? "/images/liked.svg" : "/images/unliked.svg"}
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
          src={isAdded ? "/images/checked.svg" : "/images/plus.svg"}
          alt="Plus"
        />
      </div>
    </div>
  );
};

export default Card;

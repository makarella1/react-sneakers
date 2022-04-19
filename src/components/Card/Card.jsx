import styles from "./Card.module.scss";

const Card = ({ title, price, imageUrl }) => {
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="/images/unliked.svg" alt="Unliked" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <strong>{price} грн.</strong>
        </div>
        <img
          className="cu-p"
          width={32}
          height={32}
          src="/images/plus.svg"
          alt="Plus"
        />
      </div>
    </div>
  );
};

export default Card;

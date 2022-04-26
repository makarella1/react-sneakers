import styles from "../Card/Card.module.scss";

const OrderItem = ({ imageUrl, title, price }) => {
  return (
    <div className={`${styles.card} mr-15`}>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <strong>{price} грн.</strong>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;

import secondSneakers from "../images/sneakers/2.jpg";
import removeIcon from "../images/btn-remove.svg";
import arrow from "../images/arrow.svg";

const Drawer = () => {
  return (
    <div className="backdrop" style={{ display: "none" }}>
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between align-center">
          Корзина
          <img className="removeBtn cu-p" src={removeIcon} alt="Remove" />
        </h2>
        <div className="items">
          <div className="cartItem d-flex align-center mb-20">
            <div
              style={{
                backgroundImage: `url(${secondSneakers})`,
              }}
              className="cartItemImg"
            ></div>
            <div className="flex">
              <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
              <strong>4999 грн.</strong>
            </div>
            <img className="removeBtn cu-p" src={removeIcon} alt="Remove" />
          </div>
          <div className="cartItem d-flex align-center">
            <div
              style={{
                backgroundImage: `url(${secondSneakers})`,
              }}
              className="cartItemImg"
            ></div>
            <div className="flex">
              <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
              <strong>4999 грн.</strong>
            </div>
            <img className="removeBtn cu-p" src={removeIcon} alt="Remove" />
          </div>
        </div>
        <div className="cartTotal">
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
            Оформить заказ <img src={arrow} alt="Order" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;

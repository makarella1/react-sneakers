import firstSneakers from "../images/sneakers/1.jpg";
import unliked from "../images/unliked.svg";
import plus from "../images/plus.svg";

const Card = () => {
  return (
    <div className="card">
      <div className="favorite">
        <img src={unliked} alt="Unliked" />
      </div>
      <img width={133} height={112} src={firstSneakers} alt="Sneakers" />
      <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <strong>4999 грн.</strong>
        </div>
        <img className="cu-p" width={32} height={32} src={plus} alt="Plus" />
      </div>
    </div>
  );
};

export default Card;

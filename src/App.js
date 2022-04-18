import logo from "./images/logo.png";
import cart from "./images/cart.svg";
import user from "./images/user.svg";
import plus from "./images/plus.svg";
import firstSneakers from "./images/sneakers/1.jpg";
import secondSneakers from "./images/sneakers/2.jpg";
import thirdSneakers from "./images/sneakers/3.jpg";
import fourthSneakers from "./images/sneakers/4.jpg";

const App = () => {
  return (
    <div className="wrapper clear">
      <header className="d-flex justify-between align-center p-40">
        <div className="d-flex align-center">
          <img width={40} height={40} src={logo} alt="Logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul className="d-flex">
          <li className="mr-30">
            <img width={18} height={18} src={cart} alt="Cart" />
            <span>1205 грн.</span>
          </li>
          <li>
            <img width={18} height={18} src={user} alt="User" />
          </li>
        </ul>
      </header>
      <main className="content p-40">
        <h1 className="mb-40">Все кроссовки</h1>

        <div className="d-flex justify-between">
          <div className="card">
            <img width={133} height={112} src={firstSneakers} alt="Sneakers" />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <strong>4999 грн.</strong>
              </div>
              <button className="button">
                <img width={11} height={11} src={plus} alt="Plus" />
              </button>
            </div>
          </div>
          <div className="card">
            <img width={133} height={112} src={secondSneakers} alt="Sneakers" />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <strong>4999 грн.</strong>
              </div>
              <button className="button">
                <img width={11} height={11} src={plus} alt="Plus" />
              </button>
            </div>
          </div>
          <div className="card">
            <img width={133} height={112} src={thirdSneakers} alt="Sneakers" />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <strong>4999 грн.</strong>
              </div>
              <button className="button">
                <img width={11} height={11} src={plus} alt="Plus" />
              </button>
            </div>
          </div>
          <div className="card">
            <img width={133} height={112} src={fourthSneakers} alt="Sneakers" />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <strong>4999 грн.</strong>
              </div>
              <button className="button">
                <img width={11} height={11} src={plus} alt="Plus" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

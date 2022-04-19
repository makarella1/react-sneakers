import logo from "../images/logo.png";
import cart from "../images/cart.svg";
import user from "../images/user.svg";

const Header = () => {
  return (
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
  );
};

export default Header;

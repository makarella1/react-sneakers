import axios from "axios";

import { useEffect, useState } from "react";

import Drawer from "./components/Drawer";
import Card from "./components/Card";
import Header from "./components/Header";

const App = () => {
  const [sneakersData, setSneakersData] = useState([]);
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchSneakersData = async () => {
      const response = await axios.get(
        "https://625f9a9053a42eaa07f777b7.mockapi.io/sneakers"
      );
      setSneakersData(response.data);
    };

    fetchSneakersData();
  }, []);

  const cartOpenedHandler = () => {
    setIsCartOpened(true);
  };

  const cartClosedHandler = () => {
    setIsCartOpened(false);
  };

  const cartItemAddedHandler = (item) => {
    setCartItems((prevItems) => [item, ...prevItems]);
  };

  return (
    <div className="wrapper clear">
      {isCartOpened && (
        <Drawer items={cartItems} onCartClosed={cartClosedHandler} />
      )}
      <Header onCartOpened={cartOpenedHandler} />
      <main className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/images/search.svg" alt="Search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex justify-between flex-wrap">
          {sneakersData.map((item) => {
            return (
              <Card
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                id={item.id}
                onCartItemAdded={cartItemAddedHandler}
                key={item.id}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default App;

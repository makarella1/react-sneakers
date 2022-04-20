import axios from "axios";

import { useEffect, useState } from "react";

import Drawer from "./components/Drawer";
import Card from "./components/Card";
import Header from "./components/Header";

const App = () => {
  const [sneakersData, setSneakersData] = useState([]);
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const sneakersData = await axios.get(
        "https://625f9a9053a42eaa07f777b7.mockapi.io/sneakers"
      );
      setSneakersData(sneakersData.data);

      const cartData = await axios.get(
        "https://625f9a9053a42eaa07f777b7.mockapi.io/cart"
      );
      setCartItems(cartData.data);
    };

    fetchData();
  }, []);

  const cartOpenedHandler = () => {
    setIsCartOpened(true);
  };

  const cartClosedHandler = () => {
    setIsCartOpened(false);
  };

  const cartItemAddedHandler = async (item) => {
    await axios.post("https://625f9a9053a42eaa07f777b7.mockapi.io/cart", item);
    setCartItems((prevItems) => [item, ...prevItems]);
  };

  const deleteCartItemHandler = async (id) => {
    // await axios.delete(
    //   `https://625f9a9053a42eaa07f777b7.mockapi.io/cart/${id}`
    // );
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const inputHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearchHandler = () => {
    setSearchTerm("");
  };

  const filteredSneakersData = sneakersData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const header =
    searchTerm.length > 0 ? `Поиск по "${searchTerm}"` : "Все кроссовки";

  const showClearBtn = searchTerm.length > 0 && (
    <img
      className="cu-p"
      src="/images/btn-remove.svg"
      alt="Search"
      onClick={clearSearchHandler}
    />
  );

  return (
    <div className="wrapper clear">
      {isCartOpened && (
        <Drawer
          items={cartItems}
          onCartClosed={cartClosedHandler}
          onDeleteCartItem={deleteCartItemHandler}
        />
      )}
      <Header onCartOpened={cartOpenedHandler} />
      <main className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>{header}</h1>
          <div className="search-block d-flex">
            <img src="/images/search.svg" alt="Search" />
            <input
              value={searchTerm}
              onChange={inputHandler}
              type="text"
              placeholder="Поиск..."
            />
            {showClearBtn}
          </div>
        </div>

        <div className="d-flex justify-between flex-wrap">
          {filteredSneakersData.map((item) => {
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

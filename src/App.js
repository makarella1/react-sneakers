import axios from "axios";

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";

import Home from "./pages/Home";

const App = () => {
  const [sneakersData, setSneakersData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoritesData, setFavoritesData] = useState([]);
  const [isCartOpened, setIsCartOpened] = useState(false);
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

      const favoritesData = await axios.get(
        "https://625f9a9053a42eaa07f777b7.mockapi.io/favorites"
      );
      setFavoritesData(favoritesData.data);
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
    const cartData = await axios.get(
      "https://625f9a9053a42eaa07f777b7.mockapi.io/cart"
    );
    setCartItems(cartData.data);
  };

  const addedToFavoritesHandler = async (item) => {
    try {
      const { id } = item;
      if (favoritesData.find((obj) => obj.id === id)) {
        await axios.delete(
          `https://625f9a9053a42eaa07f777b7.mockapi.io/favorites/${id}`
        );
        setFavoritesData((prevItems) =>
          prevItems.filter((obj) => obj.id !== id)
        );
      } else {
        await axios.post(
          "https://625f9a9053a42eaa07f777b7.mockapi.io/favorites",
          item
        );
        const favoritesData = await axios.get(
          "https://625f9a9053a42eaa07f777b7.mockapi.io/favorites"
        );
        setFavoritesData(favoritesData.data);
      }
    } catch (e) {
      alert("Что-то пошло не так :(");
    }
  };

  const deleteCartItemHandler = async (id) => {
    await axios.delete(
      `https://625f9a9053a42eaa07f777b7.mockapi.io/cart/${id}`
    );
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const inputHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearchHandler = () => {
    setSearchTerm("");
  };

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
      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchTerm={searchTerm}
              clearSearchHandler={clearSearchHandler}
              inputHandler={inputHandler}
              cartItemAddedHandler={cartItemAddedHandler}
              addedToFavoritesHandler={addedToFavoritesHandler}
              sneakersData={sneakersData}
            />
          }
        ></Route>
        <Route
          path="/favorites"
          element={
            <Favorites
              cartItemAddedHandler={cartItemAddedHandler}
              addedToFavoritesHandler={addedToFavoritesHandler}
              favoritesData={favoritesData}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;

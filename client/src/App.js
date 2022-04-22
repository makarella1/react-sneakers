import axios from "axios";

import Context from "./context";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const sneakersData = await axios.get("http://localhost:3001/sneakers");
      setSneakersData(sneakersData.data);

      const cartData = await axios.get("http://localhost:3001/cart");
      setCartItems(cartData.data);

      const favoritesData = await axios.get("http://localhost:3001/favorites");
      setFavoritesData(favoritesData.data);

      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isCartOpened);
  }, [isCartOpened]);

  const cartOpenedHandler = () => {
    setIsCartOpened(true);
  };

  const cartClosedHandler = () => {
    setIsCartOpened(false);
  };

  const cartItemAddedHandler = async (item) => {
    try {
      const { id } = item;
      if (cartItems.find((obj) => obj.id === id)) {
        await axios.delete(`http://localhost:3001/cart/${id}`);
        setCartItems((prevItems) => prevItems.filter((obj) => obj.id !== id));
      } else {
        await axios.post("http://localhost:3001/cart", item);
        const cartData = await axios.get("http://localhost:3001/cart");
        setCartItems(cartData.data);
      }
    } catch (e) {
      alert("Что-то пошло не так :(");
    }
  };

  const addedToFavoritesHandler = async (item) => {
    try {
      const { id } = item;
      if (favoritesData.find((obj) => obj.id === id)) {
        await axios.delete(`http://localhost:3001/favorites/${id}`);
        setFavoritesData((prevItems) =>
          prevItems.filter((obj) => obj.id !== id)
        );
      } else {
        await axios.post("http://localhost:3001/favorites", item);
        const favoritesData = await axios.get(
          "http://localhost:3001/favorites"
        );
        setFavoritesData(favoritesData.data);
      }
    } catch (e) {
      alert("Что-то пошло не так :(");
    }
  };

  const deleteCartItemHandler = async (id) => {
    await axios.delete(`http://localhost:3001/cart/${id}`);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const inputHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearchHandler = () => {
    setSearchTerm("");
  };

  return (
    <Context.Provider value={{ sneakersData, cartItems, favoritesData }}>
      {" "}
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
                favoritesData={favoritesData}
                searchTerm={searchTerm}
                clearSearchHandler={clearSearchHandler}
                inputHandler={inputHandler}
                cartItemAddedHandler={cartItemAddedHandler}
                addedToFavoritesHandler={addedToFavoritesHandler}
                sneakersData={sneakersData}
                cartItems={cartItems}
                isLoading={isLoading}
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
    </Context.Provider>
  );
};

export default App;

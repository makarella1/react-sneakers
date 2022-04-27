import axios from "axios";

import Context from "./context";

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Drawer from "./components/Drawer";
import Header from "./components/Header";

import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

const App = () => {
  const [sneakersData, setSneakersData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoritesData, setFavoritesData] = useState([]);
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sneakersData, cartData, favoritesData] = await Promise.all([
          axios.get("http://localhost:3001/sneakers"),
          axios.get("http://localhost:3001/cart"),
          axios.get("http://localhost:3001/favorites"),
        ]);

        setSneakersData(sneakersData.data);
        setCartItems(cartData.data);
        setFavoritesData(favoritesData.data);
      } catch (error) {
        alert("Ошибка при запросе данных :(");
        console.error(error);
      }

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
    } catch (error) {
      alert("Что-то пошло не так :(");
      console.error(error);
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
    } catch (error) {
      alert("Что-то пошло не так :(");
      console.error(error);
    }
  };

  const deleteCartItemHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/cart/${id}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      alert("Ошибка при удалении товара :(");
      console.error(error);
    }
  };

  const inputHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearchHandler = () => {
    setSearchTerm("");
  };

  return (
    <Context.Provider
      value={{
        sneakersData,
        cartItems,
        favoritesData,
        cartItemAddedHandler,
        addedToFavoritesHandler,
        cartClosedHandler,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          onDeleteCartItem={deleteCartItemHandler}
          opened={isCartOpened}
        />
        <Header onCartOpened={cartOpenedHandler} />
        <Routes>
          <Route
            path=""
            element={
              <Home
                searchTerm={searchTerm}
                clearSearchHandler={clearSearchHandler}
                inputHandler={inputHandler}
                isLoading={isLoading}
              />
            }
          ></Route>
          <Route path="favorites" element={<Favorites />}></Route>
          <Route path="orders" element={<Orders />}></Route>
        </Routes>
      </div>
    </Context.Provider>
  );
};

export default App;

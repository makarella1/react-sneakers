import Card from "../components/Card";
import Context from "../context";
import { useContext } from "react";

const Home = ({ searchTerm, clearSearchHandler, inputHandler, isLoading }) => {
  const {
    sneakersData,
    cartItems,
    favoritesData,
    cartItemAddedHandler,
    addedToFavoritesHandler,
  } = useContext(Context);

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

  const isItemAdded = (item, array) => {
    return item && array.some((obj) => obj.id === item.id) ? true : false;
  };

  const renderItems = (isLoading ? [...Array(8)] : filteredSneakersData).map(
    (item, index) => {
      return (
        <Card
          {...item}
          isLoading={isLoading}
          onCartItemAdded={cartItemAddedHandler}
          onAddedToFavorites={addedToFavoritesHandler}
          key={item ? item.id : index}
          isInCart={isItemAdded(item, cartItems)}
          isInFavorites={isItemAdded(item, favoritesData)}
        />
      );
    }
  );

  return (
    <main className="content p-40">
      <div className="search d-flex justify-between align-center mb-40">
        <h1 className="mainHeader">{header}</h1>
        <div className="search-block d-flex">
          <img src="images/search.svg" alt="Search" />
          <input
            value={searchTerm}
            onChange={inputHandler}
            type="text"
            placeholder="Поиск..."
          />
          {showClearBtn}
        </div>
      </div>

      <div className="sneakersContainer d-flex justify-between flex-wrap">
        {renderItems}
      </div>
    </main>
  );
};

export default Home;

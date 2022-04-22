import Card from "../components/Card";

const Home = ({
  searchTerm,
  clearSearchHandler,
  inputHandler,
  cartItemAddedHandler,
  addedToFavoritesHandler,
  sneakersData,
  cartItems,
  favoritesData,
  isLoading,
}) => {
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

  const renderItems = (isLoading ? [...Array(8)] : filteredSneakersData).map(
    (item, index) => {
      return (
        <Card
          {...item}
          isLoading={isLoading}
          onCartItemAdded={cartItemAddedHandler}
          onAddedToFavorites={addedToFavoritesHandler}
          key={item ? item.id : index}
          isInCart={
            item && cartItems.some((obj) => obj.id === item.id) ? true : false
          }
          isInFavorites={
            item && favoritesData.some((obj) => obj.id === item.id)
              ? true
              : false
          }
        />
      );
    }
  );

  return (
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

      <div className="d-flex justify-between flex-wrap">{renderItems}</div>
    </main>
  );
};

export default Home;

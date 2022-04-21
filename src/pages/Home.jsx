import Card from "../components/Card";

const Home = ({
  searchTerm,
  clearSearchHandler,
  inputHandler,
  cartItemAddedHandler,
  addedToFavoritesHandler,
  sneakersData,
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

      <div className="d-flex justify-between flex-wrap">
        {filteredSneakersData.map((item) => {
          return (
            <Card
              {...item}
              onCartItemAdded={cartItemAddedHandler}
              onAddedToFavorites={addedToFavoritesHandler}
              key={item.id}
              isInFavorites={false}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Home;

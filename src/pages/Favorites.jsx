import Card from "../components/Card";

const Favorites = ({
  cartItemAddedHandler,
  addedToFavoritesHandler,
  favoritesData,
}) => {
  return (
    <main className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>Избранные</h1>
      </div>

      <div className="d-flex justify-between flex-wrap">
        {favoritesData.map((item) => {
          return (
            <Card
              {...item}
              onCartItemAdded={cartItemAddedHandler}
              onAddedToFavorites={addedToFavoritesHandler}
              key={item.id}
              isInFavorites={true}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Favorites;

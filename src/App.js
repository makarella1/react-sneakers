import Drawer from "./components/Drawer";
import Card from "./components/Card";
import Header from "./components/Header";

const data = [
  {
    title: "Мужские Кроссовки Nike Blazer Mid Suede",
    price: 5999,
    imageUrl: "../images/sneakers/1.jpg",
  },
  {
    title: "Мужские Кроссовки Nike Air Max 270",
    price: 5999,
    imageUrl: "../images/sneakers/2.jpg",
  },
  {
    title: "Мужские Кроссовки Nike Blazer Mid Suede",
    price: 3499,
    imageUrl: "../images/sneakers/3.jpg",
  },
  {
    title: "Кроссовки Puma X Aka Boku Future Rider",
    price: 3999,
    imageUrl: "../images/sneakers/4.jpg",
  },
];

const App = () => {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <main className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/images/search.svg" alt="Search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex justify-between flex-wrap">
          {data.map((item) => {
            return (
              <Card
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default App;

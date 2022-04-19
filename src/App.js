import search from "./images/search.svg";

import Drawer from "./components/Drawer";
import Card from "./components/Card";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <main className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src={search} alt="Search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex justify-between flex-wrap">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </main>
    </div>
  );
};

export default App;

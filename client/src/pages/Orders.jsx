import axios from "axios";

import OrderItem from "../components/OrderItem/OrderItem";

import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const ordersData = await axios.get("http://localhost:3001/orders");
      setOrders(ordersData.data);
    })();
  }, []);

  return (
    <main className="content p-40">
      <h1 className="mb-40">Мои заказы</h1>

      {orders.map((order) => {
        return (
          <div key={order.id} className="mb-40">
            <div className="d-flex align-center justify-center">
              <h3>Заказ № {order.id}</h3>
            </div>
            <div className="d-flex flex-wrap">
              {order.items.map((item) => {
                return <OrderItem {...item} key={item.id} />;
              })}
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default Orders;

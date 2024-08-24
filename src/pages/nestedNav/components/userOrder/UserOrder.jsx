import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookie from 'cookie-universal';
import Loader from '../../../../components/loader/components/Loader';
import './userOrder.css';

function UserOrder() {
  const [isLoader, setIsLoader] = useState(true);
  const [userOrders, setUserOrders] = useState([]);
  const cookie = Cookie();
  const token = cookie.get('userToken');

  const getUserOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/order`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setUserOrders(data.orders);
      setIsLoader(false);
    } catch (error) {
      setIsLoader(false); 
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div className="userOrder">
      {isLoader ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <>
          <div className="userTable">
          <table>
            <caption> <h1>Your Orders</h1></caption>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Order Status</th>
                <th>Order Total</th>
                <th>Products Number</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.slice(0, 10)}</td>
                  <td>{order.status}</td>
                  <td>${order.finalPrice}</td>
                  <td>{order.products.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </>
      )}
    </div>
  );
}

export default UserOrder;

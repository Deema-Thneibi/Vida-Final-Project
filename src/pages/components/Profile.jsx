// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import Cookie from "cookie-universal";
// import Loader from "../../components/loader/components/Loader";
// import './profile.css'

// function Profile() {
//     const cookie = Cookie();
//     const token = cookie.get("userToken");
//     const[user, setUser] = useState({});
//     const [isLoader, setIsLoader] = useState(true);
//     const [userOrders, setUserOrders] = useState([]);


//     const getProfileInfo = async () =>{
//         const {data} = await axios.get(`${import.meta.env.VITE_API}/user/profile`,
//             {
//                 headers: {
//                     Authorization: `Tariq__${token}`,
//                   },
//             }
//         )
//         setUser(data.user);
//         await  getUserOrders();

//     }

//     const getUserOrders = async () =>{
//         const {data} = await axios.get(`${import.meta.env.VITE_API}/order`,
//             {
//                 headers: {
//                     Authorization: `Tariq__${token}`,
//                   },
//             }
//         )
//         setUserOrders(data.orders);
//         setIsLoader(false);
//     }

//     useEffect(() => {
//         getProfileInfo();
//     }, [])

//     if (isLoader) {
//         return <Loader />;
//       }

//   return (
//     <>
//     <div className="profile">
//         <div className="container">
//             <div className="userInfo">
//             <div className="userImg">
//             <img src={user.image.secure_url}/>
//             </div>
//             <div className="userInfoDetails">
//             <p><span>Name: </span>{user.userName}</p>
//             <p><span>Email: </span> {user.email}</p>
//             <p><span>Account created at: </span>{user.createdAt.slice(0,10)}</p>

//             </div>
//             </div>

//             <div className="userOrder">
//                 <h1>Your Orders</h1>
//                <table>
//                  <thead>
//                    <tr>
//                      <th>Order ID</th>
//                      <th>Order Date</th>
//                      <th>Order Status</th>
//                      <th>Order Total</th>
//                      <th>Products Number</th>
//                    </tr>
//                  </thead>
//                  <tbody>
//                    {userOrders.map((order) => (
//                      <tr key={order._id}>
//                        <td>{order._id}</td>
//                        <td>{order.createdAt.slice(0,10)}</td>
//                        <td>{order.status}</td>
//                        <td>${order.finalPrice}</td>
//                        <td>{order.products.length}</td>
//                      </tr>
//                    ))}
//                  </tbody>
//                </table>
//             </div>
//             </div>
//         </div>
//     </>
//   )
// }

// export default Profile


import React from 'react'

function Profile() {
  return (
    <div>Profile</div>
  )
}

export default Profile
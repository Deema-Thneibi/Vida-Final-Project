import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "cookie-universal";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Loader from "../../../components/loader/components/Loader";
import CartIsEmpty from "./img/delete.png";
import "./shoppingCart.css";

function ShoppingCart() {

  const [cartProducts, SetCartProsucts] = useState([]);
  const [isIncrease, setisIncrease] = useState(false);
  const [isDecrease, setisDecrease] = useState(false);
  const [isLoader, setIsLoader] = useState(true);
  const [cart, setCartCount] = useState();
  const [totalPrice, settotalPrice] = useState(0);

  const cookie = Cookie();
  const token = cookie.get("userToken");

  const shoppingCart = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
  
      if (data && data.products) {
        setCartCount(data.count || 0);
        SetCartProsucts(data.products);
        calculateTotalPrice(data.products);
      } else {
        setCartCount(0);
        SetCartProsucts([]);
      }
    } catch (error) {
      setCartCount(0);
      SetCartProsucts([]);
    } finally {
      setIsLoader(false);
    }
  };
  

  const decreaseQuantity = async (productId) => {
    setisDecrease(true);
    await axios.patch(
      `${import.meta.env.VITE_API}/cart/decraseQuantity`,
      { productId },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    await shoppingCart();
    setisDecrease(false);
  };

  const increaseQuantity = async (productId) => {
    setisIncrease(true);
    await axios.patch(
      `${import.meta.env.VITE_API}/cart/incraseQuantity`,
      { productId },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    await shoppingCart();
    setisIncrease(false);
  };

  const removeProduct = async (productId, productName) => {
    Swal.fire({
      title: `Are you sure you want to delete "${productName}"?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoader(true);
        try {
          await axios.patch(
            `${import.meta.env.VITE_API}/cart/removeItem`,
            { productId },
            {
              headers: {
                Authorization: `Tariq__${token}`,
              },
            }
          );
          await shoppingCart();
          Swal.fire({
            title: "Deleted!",
            text: `"${productName}" has been removed from your cart.`,
            icon: "success",
          });
        } catch (error) {
          console.error("Error removing item:", error);
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting your item.",
            icon: "error",
          });
        } finally {
          setIsLoader(false);
        }
      }
    });
  };

  const calculateTotalPrice = (products) => {
    let total = 0;
    products.forEach((product) => {
      total += product.quantity * product.details.finalPrice;
    });
    settotalPrice(total);
  };

  
  const clearCart = async () => {
    setIsLoader(true);
    const { data } = await axios.patch(`${import.meta.env.VITE_API}/cart/clear`,{}, {
      headers: {
        Authorization: `Tariq__${token}`,
      },
    });
    await shoppingCart();
    await setIsLoader(false);
  };


  useEffect(() => {
    shoppingCart();
  }, []);

  if (isLoader) {
    return <Loader />;
  }

  return (
    <>
      {cart == 0 ? (
        <div className="cartEmpty">
          <div className="container">
            <div className="cartImg">
              <img src={CartIsEmpty} />
            </div>
            <h2>Your Cart is Empty</h2>
            <p>
              Looks like you have not added anything to your cart. Go ahead &
              explore top Categories
            </p>
            <button>
              <Link to="/">Continue Shopping</Link>
            </button>
          </div>
        </div>
      ) : (
        <div className="shoppingCart">
          <div className="cart">
            <div className="container">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th></th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>SubTotal</th>
                  </tr>
                </thead>

                <tbody>
                  {cartProducts.map((product) => (
                    <tr key={product.productId}>
                      <td className="productImg">
                        <img
                          src={product.details.mainImage.secure_url}
                          alt={product.details.name}
                        />
                      </td>
                      <td className="productName">
                        <h2>{product.details.name}</h2>
                        <p
                          onClick={() =>
                            removeProduct(product.productId, product.details.name)
                          }
                        >
                          × Remove
                        </p>
                      </td>
                      <td className="quantity">
                        <div className="productQuantity">
                          <button
                            onClick={() => decreaseQuantity(product.productId)}
                            disabled={
                              (isDecrease ?? "disabled") ||
                              (product.quantity == 1 ?? "disabled")
                            }
                          >
                            -
                          </button>
                          <p>{product.quantity}</p>
                          <button
                            onClick={() => increaseQuantity(product.productId)}
                            disabled={isIncrease ?? "disabled"}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="ProductPrice">
                        {product.details.finalPrice}
                      </td>
                      <td className="ProductSubTotal">
                        {product.quantity * product.details.finalPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="cartSummary">
            <div className="container">
              <div className="summary">
              <h1>Cart Summary</h1>
              <button onClick= {clearCart} className="clearCart">clear cart</button>

              <div className="subtotal">
              <p>Subtotal ({cart} item)</p>
              <p>$ {totalPrice}</p>
              </div>
              
              <div className="shippingFee">
              <p>Shippping Fee</p>
              <p className="free">FREE</p>
              </div>
              
              <div className="total">
              <p>Total</p>
              <p>$ {totalPrice}</p>
              </div>

              <div className="checkOut">
                <button><Link to="/order">CHECKOUT</Link></button>
              </div>

             </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShoppingCart;

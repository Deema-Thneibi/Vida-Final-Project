import React, { useEffect, useState } from 'react'
import { number, object, string } from 'yup'; // npm i yup
import axios from 'axios';
import { Slide, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from "../../../components/loader/components/Loader";
import Cookie from  'cookie-universal'
import './order.css'


function Order() {
  const [errors, setErrors] = useState([])
  const [isLoader, setIsLoader] = useState(true);
  const navigate = useNavigate();
  const cookie = Cookie();
  const token = cookie.get("userToken");

  const [products, setProducts] = useState([]);

  const [orderdetails, setOrderDetails] = useState(
    {
      couponName: '',
      address: '',
      phone: ''
    } 
  )

  const shoppingCart = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API}/cart`, {
      headers: {
        Authorization: `Tariq__${token}`,
      },
    });
    setProducts(data.products);
    setIsLoader(false);
  };


  const handleChange = (e) =>{
    const {name, value} = e.target;
    setOrderDetails(
        {
            ...orderdetails,
            [name]: value,
        }
    )
}


const validateData = async () =>{
  // make object for validation
  let orderSchema = object({
      address: string().required(),
      phone: number().required(),
    });

    try{
      await orderSchema.validate(orderdetails, {abortEarly: false})
      return true;
    } catch(error){
      const validationError = {};
      error.inner.forEach(async err => {
          validationError[err.path] = err.message;
           setErrors(validationError);
      });
      return false;
    }
}

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoader(true);
  if(await validateData()){
  try{
  const {data} = await axios.post(`${import.meta.env.VITE_API}/order`,
    {
      couponName:orderdetails.couponName,
      address:orderdetails.address,
      phone:orderdetails.phone,
  },
  {
    headers: {
      Authorization: `Tariq__${token}`,
    },
  });
  if(data.message == 'success') {
    toast.success('The order has been successfully completed', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });

        setOrderDetails(
          {
            couponName: '',
            address: '',
            phone: ''
          } );
        
  navigate('/');
}

} catch(error){
toast.error(error.response.data.message, {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Slide,
  });
}finally{
  setIsLoader(false);
}
}  
setIsLoader(false);

}

useEffect(()=>{
  shoppingCart();
},[])

if (isLoader) {
  return <Loader />;
}

  return (
    <>

    <div className="orderProducts">
      <div className='order'>
      <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Create Order</h1> <br/>
        <div className='cartProduct'>
          {
            products.map((product) => (
              <div key={product._id} className='productItem'>
                <div className='productImg'>
                <img src={product.details.mainImage.secure_url} alt={product.details.name}/>
                </div>
                <div className='productQuantity'>
                  <p>quantity: {product.quantity}</p>
                  </div>
  
              </div>
            ))
          }
        </div>
        <input type='text' name='couponName' value={orderdetails.couponName} onChange={handleChange} placeholder='CouponName' /> 

        <input type='text' name='address' value={orderdetails.address} onChange={handleChange} placeholder='Address'/>
        {errors.address && <p className='info'>{errors.address}</p>}

        <input type='text' name='phone' value={orderdetails.phone} onChange={handleChange} placeholder='Phone' />
        {errors.phone && <p className='info'>{errors.phone}</p>}

        <button type='submit' name='submit' value='submit'>Order</button>
       </form>
       </div>
      </div>
    </div>
    </>
    )
}

export default Order;
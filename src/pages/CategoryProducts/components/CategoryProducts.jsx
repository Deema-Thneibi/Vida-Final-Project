import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../../components/loader/components/Loader';


import "./categoryProducts.css";
export default function CategoryProducts() {
  const { id } = useParams("id");
  const { name } = useParams("name");

  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [isLoader, setIsLoader] = useState(true);

  const getCategoryProducts = async () => {
    try{
    const { data } = await axios.get(
      `${import.meta.env.VITE_API}/products/category/${id}`
    );
    setProducts(data.products);
  }catch(error){
    setError('Failed to fetch products.');
  }finally{
    setIsLoader(false);
  }
  };

  useEffect(() => {
    getCategoryProducts();
  }, []);


  if (isLoader) {
    return <Loader/>;
  }

  return (
    <>
      <div className="products">
        <div className="container">
        <h2>{name}</h2>
        {error?<div className='error container'><h2>{error}</h2></div>:
        <div className="row ">
          
          {(products.length>0)?products.map((product) => (
            <div className="product" key={product._id}>
              <Swiper
                pagination={{
                  clickable: true,
                }}
                centeredSlides={true}
                loop={true}
                navigation={true}
                autoplay={{
                  delay: 50000,
                  disableOnInteraction: false,
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img src={product.mainImage.secure_url} alt={product.name} />
                </SwiperSlide>
                {product.subImages.map((subImage,index=0) => (
                  <SwiperSlide key={index++}>
                    <img
                      src={subImage.secure_url}
                      alt={product.name}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="content">
                <div className="productName">
                  <h3>{product.name}</h3>
                </div>
                <div className="priceCartButton">
                {(product.discount <= 0) ? (
                  <div className="productPrice">
                    <p className="finalPrice"> ${product.finalPrice}</p>
                  </div>
                ) : (
                  <div className="productPrice">
                    <p className="price"> ${product.price}</p>
                    <p className="finalPrice"> ${product.finalPrice}</p>
                    <p className="discount"> {product.discount}% off</p>
                  </div>
                )}
             
              <div className="cartButton">
                <Link to={`/product/${product._id}`}><button><FontAwesomeIcon icon={faCartPlus} className="cartIcon"/></button></Link>
                </div>
                </div>
                </div>
            </div>
          )): <div className='empty container'><h2>Empty Products</h2></div>}
        </div>
}
        </div>
      </div>
    </>
  );
}

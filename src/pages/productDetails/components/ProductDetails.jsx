import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../../components/loader/components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
 import StarRating from "./starRating/StarRating.jsx";
 import Cookie from  'cookie-universal';
import "./productDetails.css";
import { Slide, toast } from 'react-toastify';



// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ProductDetails() {
  const { id } = useParams("id");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [isLoader, setIsLoader] = useState(true);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/products/${id}`
      );
      setProduct(data.product);
    } catch (error) {
      setError("Failed to fetch product details.");
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const addToCart = async (id) => {
    const cookie =  Cookie();
    const token = cookie.get('userToken');
    if(token){
    try{
      setIsAddedToCart(true);
      const {data} = await axios.post(`${import.meta.env.VITE_API}/cart`,
        {
          productId:id
        },
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        }
      )
      toast.success('Product added to cart successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });
    }catch(error){
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
    }finally {
      setIsAddedToCart(false);
    }
  } 

else {
  toast.info('Please signin to add products to cart', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Slide,
    });
    setIsAddedToCart(false);
}
  }
  if (isLoader) {
    return <Loader />;
  }

  return (
    <>
      <div className="productPage">
        <div className="container">
        {error?<div className='error container'><h2>{error}</h2></div>:
          <div className="productSections row">
            <div className="productPageUpSection">
              <div className="productImages">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  direction="vertical"
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img src={product.mainImage.secure_url} alt={product.name} />
                  </SwiperSlide>
                  {product.subImages.map((subImage) => (
                    <SwiperSlide key={subImage._id}>
                      <img src={subImage.secure_url} alt={product.name} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                <SwiperSlide>
                  <img src={product.mainImage.secure_url} alt={product.name} />
                </SwiperSlide>
                {product.subImages.map((subImage) => (
                  <SwiperSlide key={subImage._id}>
                    <img src={subImage.secure_url} alt={product.name} />
                  </SwiperSlide>
                ))}
              </Swiper>
              </div>
              <div className="productInfo">
              <h2>{product.name}</h2>
              {product.discount <= 0 ? (
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
              <div className="shipping">
                <FontAwesomeIcon icon={faTruck} />
                <p>2 days Shipping</p>
              </div>
              <div className="addToCart">
                <button onClick={()=>addToCart(product._id)}    disabled={isAddedToCart??'disabled'}>Add to Cart</button>
              </div>
            </div>
            </div>
            <div className="productPageDownSection">
          <div className="productReviews">
            <h2>Reviews</h2>
            {
              product.reviews.map(review =>
                <>
                <div key={review._id} className="review">
                  <div className="rating">
                  <p>{review.createdBy.userName}</p>
                  <StarRating rating={review.rating} /> 
                  </div>
                  <p>{review.comment}</p>
                </div>
                </>
              )
            }
          </div>
          </div>

          </div>
}
        </div>
      </div>
    </>
  );
}

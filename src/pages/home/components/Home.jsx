import "./home.css";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import required modules
import { Autoplay } from 'swiper/modules';

import Categories from '../../categories/components/Categories'
import AllProducts from "../../allProducts/components/AllProducts";


export default function Home() {
  const slides = [
    {
      id: 'slide1',
      heading: 'One Place That Brings Together All Your Needs',
      imgSrc: require("./img/couple-shopping.png"),
      alt: 'couple-shopping'
    },
    {
      id: 'slide2',
      heading: '70% Off On All Products Sale',
      imgSrc: require("./img/sale.png"),
      alt: 'sale image'
    },
    {
      id: 'slide3',
      heading: '30% Off On All Women\'s Wear',
      imgSrc: require("./img/women-shopping.png"),
      alt: 'women shopping'
    }
  ];


  return (
    <>
      <div className="hero">
        <div className="rectangle"></div>
       <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={1000}
          modules={[Autoplay]}
          className="mySwiper container"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="slide">
              <div className="heading">
                <h1>{slide.heading}</h1>
                <button><a href="#allProducts">SHOP NOW</a></button>
              </div>
              <div className="slideImg">
                <img src={slide.imgSrc} alt={slide.alt} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper> <br/>
        </div>
     <Categories/> 
     <AllProducts/>
    </>
  );
}


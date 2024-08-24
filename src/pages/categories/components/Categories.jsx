import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from "../../../context/User";
import { Link } from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Loader from '../../../components/loader/components/Loader';

import './categories.css';

export default function Categories() {
  const { categories, setCategories, getCategories, isLoaderCategories, CategoriesError } = useContext(UserContext);
  // const [error, setError] = useState('');
  // const [isLoader, setIsLoader] = useState(true);

  const [perView, setPerView] = useState(() => {
    if (window.innerWidth >= 1328) return 7;
    else if (window.innerWidth >= 1172 && window.innerWidth < 1328) return 6;
    else if (window.innerWidth >= 903 && window.innerWidth < 1172) return 5;
    else if (window.innerWidth >= 809 && window.innerWidth < 903) return 4.5;
    else if (window.innerWidth >= 732 && window.innerWidth < 809) return 4;
    else if (window.innerWidth >= 650 && window.innerWidth < 732) return 3.5;
    else if (window.innerWidth >= 545 && window.innerWidth < 650) return 3;
    else if (window.innerWidth >= 467 && window.innerWidth < 545) return 2.5;
    else if (window.innerWidth >= 500 && window.innerWidth < 467) return 2.;


    else return 1.5; 
  });

  const handleResize = () => {
    if (window.innerWidth >= 1328) {
      setPerView(7);
    } else if (window.innerWidth >= 1172 && window.innerWidth < 1328) {
      setPerView(6);
    } else if (window.innerWidth >= 903 && window.innerWidth < 1172) {
      setPerView(5);
    } else if (window.innerWidth >= 805 && window.innerWidth < 903) {
      setPerView(4.5);
   } else if (window.innerWidth >= 732 && window.innerWidth < 809) {
      setPerView(4);
    } else if (window.innerWidth >= 650 && window.innerWidth < 732) {
      setPerView(3.5);
    }else if (window.innerWidth >= 545 && window.innerWidth < 650) {
      setPerView(3);
    }else if (window.innerWidth >= 467 && window.innerWidth < 545) {
      setPerView(2.5);
    }else if (window.innerWidth >= 500 && window.innerWidth < 467) {
      setPerView(2);
    }
    else {
      setPerView(1.5); // Adjust according to your design
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  useEffect(() => {
    getCategories();
  }, []);

  if (isLoaderCategories) {
    return <Loader />;
  }

  return (
    <div className="categories">
      { CategoriesError ? (
        <div className='error container'><h2>{ CategoriesError}</h2></div>
      ) : (
        <Swiper
          slidesPerView={perView}
          spaceBetween={window.innerWidth <= 440? -50 : 0 }
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper container row"
        >
          {categories.length > 0 ? categories.map(category => (
            <SwiperSlide key={category._id}>
              <Link to={`/category/${category.name}/${category._id}`}>
              <img src={category.image.secure_url} alt={category.name} />
              </Link>
            </SwiperSlide>
          )) : null}
        </Swiper>
      )}
    </div>
  );
}

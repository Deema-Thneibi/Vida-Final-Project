import { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../../components/loader/components/Loader';
import ReactPaginate from 'react-paginate';
import { UserContext } from "../../../context/User";
import { Link } from "react-router-dom";
import Footer from '../../../components/footer/Footer'

import "./allProducts.css";

export default function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1); 
  const { getAllProducts, isLoader, error, products, totalPages, sortBy, setsortBy, price, setPrice} = useContext(UserContext);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1; // ReactPaginate uses zero-indexed pages
    setCurrentPage(selectedPage);
  };
  
  const handleSortChange = (e) => {
    setsortBy(e.target.value);
  }
  
  const handlePriceChange = (e) => {
    const{name, value} = e.target;
    setPrice(
      {
        ...price,
        [name]: value,
      }
    )
  }

  useEffect(() => {
    if (!sortBy) {
      setsortBy("-name");  
    }
    getAllProducts(currentPage);
  }, [currentPage, sortBy]); 

  if (isLoader) {
    return <Loader />;
  }

  return (
    <>
      <div className="allProducts" id="allProducts">
        <div className="container">
          <div className="sort">
            <select name='sort' onChange={handleSortChange} value={sortBy}>
              <option value="-name" defaultValue={''}>Sort By</option>
              <option value="name">name</option>
              <option value="finalPrice">Lowest Price</option>
              <option value="-finalPrice">Highest Price</option>
              <option value="-discount">discount</option>
            </select>

            <div className="priceRange">
              <input type="number" name='minPrice' value={price.minPrice === 0 ? '' : price.minPrice} placeholder="min price"  onChange={handlePriceChange} min={0} />
              <input type="number" name='maxPrice' value={price.maxPrice} placeholder="max price" onChange={handlePriceChange} min={0}/>
              <button onClick={() => getAllProducts(currentPage)}>Filter</button>
              </div>

          </div>
          
          {error ? (
            <div className='error container'><h2>{error}</h2></div>
          ) : (
            <div className="row">
              {products.length > 0 ? products.map((product) => (
                <div className="product" key={product._id}>
                  <Swiper
                    pagination={{ clickable: true }}
                    centeredSlides={true}
                    loop={true}
                    navigation={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    modules={[Pagination, Navigation, Autoplay]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <img src={product.mainImage.secure_url} alt={product.name} />
                    </SwiperSlide>
                    {product.subImages.map((subImage, index) => (
                      <SwiperSlide key={index}>
                        <img src={subImage.secure_url} alt={product.name} />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <div className="content">
                    <div className="productName">
                      <h3>{product.name}</h3>
                    </div>
                    <div className="priceCartButton">
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
                      
                      <div className="cartButton">
                        <Link to={`/product/${product._id}`}>
                          <button><FontAwesomeIcon icon={faCartPlus} className="cartIcon" /></button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                <div className='empty container'><h2>Empty Products</h2></div>
              )}
            </div>
          )}
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={totalPages || 0}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
            previousClassName={currentPage === 1 ? 'disabled' : ''}
            nextClassName={currentPage === totalPages ? 'disabled' : ''} 
            disabledClassName={'disabled'} 
            forcePage={currentPage - 1} // Adjusting for zero-based index
          />
        </div>
      </div>
    </>
  );
}

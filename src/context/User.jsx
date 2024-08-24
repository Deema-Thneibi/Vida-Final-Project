import { createContext, useEffect, useState } from "react";
import Cookie from  'cookie-universal';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loader from '../components/loader/components/Loader';


export const UserContext = createContext();

const UserContextProvider = ({children})=>{
    const cookie =  Cookie();
    const [userToken, setUserToken] = useState(cookie.get('userToken'));
    const [userInfo, setUserInfo] = useState(null);

    // getCategory
    const [CategoriesError, setCategoriesError] = useState('');
    const [isLoaderCategories, setIsLoaderCategories] = useState(true);
    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
        try {
          const { data } = await axios.get(`${import.meta.env.VITE_API}/categories/active?limit=10`);
          setCategories(data.categories);
        } catch (error) {
          setCategoriesError('Failed to fetch categories');
        } finally {
            setIsLoaderCategories(false);
        }
      };


    // getAllProducts:
    // Start 
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState('');
    const [isLoader, setIsLoader] = useState(true);
    const[sortBy, setsortBy] = useState('');
    
    const [price, setPrice] = useState(
        {
            minPrice: 0,
            maxPrice: '',

        }
    );


    const getAllProducts = async (page = 1) => {
      setIsLoader(true);
      const productsPerPage = 4;
  
      try {
          const minPrice = price.minPrice || 0;
          const maxPrice = price.maxPrice === '' ? Infinity : price.maxPrice;
  
          const { data } = await axios.get(
              `${import.meta.env.VITE_API}/products?page=${page}&limit=${productsPerPage}&search=${search}&sort=${sortBy}&finalPrice[gte]=${minPrice}&finalPrice[lte]=${maxPrice}`
          );

  
          setProducts(data.products);
          setTotalProducts(data.total);
          const calculatedTotalPages = Math.ceil(data.total / productsPerPage);
          setTotalPages(calculatedTotalPages);
      } catch (error) {
          setError('Failed to fetch products.');
      } finally {
          setIsLoader(false);
      }
  };
  
      
    // End 






    const getUserData = ()=>{
        if(userToken){
            // decode userToken
            const decoded = jwtDecode(userToken);
            setUserInfo(decoded);
        }

    }
    useEffect(()=>{
        getUserData();
        getCategories();
    }, [userToken])


    return(
        <UserContext.Provider value={{setUserToken, userInfo, setUserInfo, setCategories, categories,getAllProducts, search, setSearch, isLoader, error, products, totalPages, sortBy, setsortBy,price, setPrice, getCategories, isLoaderCategories, CategoriesError}}>
            {children}
        </UserContext.Provider>
    )

};

export default UserContextProvider; 
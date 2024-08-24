import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import "./navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import Cookie from 'cookie-universal';
import { UserContext } from "../../../context/User";
import Loader from "../../loader/components/Loader";


export default function Navbar() {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 920); 

  const cookie = Cookie();
  const { userInfo, setUserInfo, setUserToken } = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const { categories} = useContext(UserContext);
  const { search, setSearch, getAllProducts } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearch(e.target.value);
    getAllProducts(e.target.value);
  };



  useEffect(() => {
    if (userInfo?.userName) {
      setUserName(userInfo.userName);
    }
  }, [userInfo]);

  const hiddenAccountMenu = () => {
    setShowAccountMenu(false);
  };

  const signOut = () => {
    cookie.remove('userToken');
    setUserToken(null);
    setUserInfo(null);
    setUserName("");
    hiddenAccountMenu();
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 920);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCategorySelect = (e) => {
    <Loader/>
      navigate(`/category/${e.target.value}`);
    }
  

  return (
    <>
      <nav className="navbar">
        <div className="row container logoSearchCartAccount">
          <div className="logo row">
            <div className="logoImg">
              <Link to='/'><img src={require("./img/logo (1).png")} alt="shopping logo" /></Link>
            </div>
            <Link to="/">Vida</Link>
          </div>

          <div className="searchCartAccount">
            <div className="row">
              <div className="search">
                <input type="text" placeholder="search" name="search" className="position" aria-label="Search" value={search} onChange={handleChange} onClick={getAllProducts} />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon position" aria-label="Search Icon" />
              </div>

              <div className="account">
                <div className="accountImg" onClick={() => setShowAccountMenu(!showAccountMenu)}>
                  <FontAwesomeIcon icon={faUser} aria-label="User Icon" />
                </div>
                {showAccountMenu ? (
                  <div className="accountMenu">
                    <ul>
                      {userName ? (
                        <>
                          <li><NavLink to="/profile" onClick={hiddenAccountMenu}>Hi, {userName}</NavLink></li>
                          <li><NavLink to="/profile" onClick={hiddenAccountMenu}>Profile</NavLink></li>
                          <li><NavLink to="/signIn" onClick={signOut}>Sign Out</NavLink></li>
                        </>
                      ) : (
                        <>
                          <li><NavLink to="/signIn" onClick={hiddenAccountMenu}>Sign In</NavLink></li>
                          <li><NavLink to="/createAccount" onClick={hiddenAccountMenu}>Create Account</NavLink></li>
                        </>
                      )}
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="cart">
                <Link to='/cart'><FontAwesomeIcon icon={faCartShopping} aria-label="Cart Icon" /></Link>
              </div>
            </div>
          </div>
        </div>

        <div className="navLinks">
          <ul className="row container">
            <li><NavLink to="/">Home</NavLink></li>



            {isDesktop ? (
              categories.map(category => (
                <li key={category._id}><NavLink to={`/category/${category.name}/${category._id}`} onClick={<Loader/>}>{category.name}</NavLink></li>
              ))
            ) : (
              <>
               <li><a href="#allProducts">Product</a></li>
                <li className="categorySelct">
                  <select onChange={handleCategorySelect}>
                  <option  value={''} disabled selected>Categories</option>
                    {categories.slice(0).map(category => (
                      <option key={category._id} value={`${category.name}/${category._id}`}>{category.name}</option>
                    ))}
                  </select>
                </li >
              </>
            )}

          </ul>
        </div>
      </nav>
    </>
  );
}

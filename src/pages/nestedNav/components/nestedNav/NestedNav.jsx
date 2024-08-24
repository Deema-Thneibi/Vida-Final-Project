import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './nestedNav.css';
import { useState} from 'react';

export default function NestedNav() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <>
        <div className='list'>
        <FontAwesomeIcon icon={faBars} className='icon' onClick={toggleMenu} />
        </div>

        {menuVisible && (
        <div className='info'>
          <p><NavLink to='/profile'>Information</NavLink></p>
          <p><NavLink to='contact'>Contact</NavLink></p>
          <p><NavLink to='userOrder'>Order</NavLink></p>
        </div>
        )}
        
    </>
  );
}

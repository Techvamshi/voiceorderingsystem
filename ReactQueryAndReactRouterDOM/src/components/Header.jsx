import React, { useContext } from 'react'
import "./HeaderCss.css"
import { NavLink } from 'react-router-dom'
import { GlobalState } from '../App'

const Header = () => {
  const { count } = useContext(GlobalState);
  let showCart = false;
  
  for (let key in count) {
    if (count[key] > 0) {
      showCart = true;
      break;
    }
  }

  return (
    <>
      <div className='Header_outer'>
        <div className='Logo'>
          <img src="Skipp_logo.avif" alt="" />
          <span> <a href="/" className='CompanyName'>SKIPP</a> </span>
        </div>
        <div className='List'>
          <ul>
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : 'notactive'}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/First" className={({ isActive }) => isActive ? 'active' : 'notactive'}>About</NavLink>
            </li>
            <li>
              <NavLink to="/Second" className={({ isActive }) => isActive ? 'active' : 'notactive'}>Login</NavLink>
            </li>
            {showCart && 
              <li>
                <NavLink to="/Cart" className={({ isActive }) => isActive ? 'active' : 'notactive'}>Cart</NavLink>
              </li>
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default Header
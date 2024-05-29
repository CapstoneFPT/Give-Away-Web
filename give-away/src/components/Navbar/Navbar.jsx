import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { Button } from "antd";
import showModal from "../../pages/Login"
import Login from '../../pages/Login'
const Navbar = () => {
    const[menu,setMenu] = useState('shop');
    
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="" />
            <p>Give Away</p>
        </div>
        <ul className='nav-menu'>
            <li onClick={()=>{setMenu('shop')}}><Link to='/' className='no-underline'>Shop</Link>{menu==='shop'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('men')}}><Link to='/men' className='no-underline'>Men</Link>{menu==='men'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('women')}}><Link to='/women' className='no-underline'>Women</Link>{menu==='women'?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu('kids')}}><Link to='/kids' className='no-underline'>Kids</Link>{menu==='kids'?<hr/>:<></>}</li>
        </ul>
        <div className='nav-login-cart'>     
            <Login/>
            <Link to='/cart'><img src={cart_icon} alt=""/></Link>
            <div className='nav-cart-count'>0</div>
        </div>
    </div>
  )
}

export default Navbar
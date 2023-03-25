import "./Header.css"
import React from 'react'
import Ramen from '../images/ramen.jpg';

function Header() {
  return (
    <div className='header' style={{ backgroundImage: `url(${Ramen})` }}>
        <h1>Ramen Everywhere</h1>
    </div>
  )
}

export default Header
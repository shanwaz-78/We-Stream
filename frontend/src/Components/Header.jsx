import React, { useRef } from 'react'
import {Link} from 'react-router-dom'

function Header() {
  const headerRef = useRef()
  // window.addEventListener('scroll',()=>{
  //   headerRef.current.style.boxShadow = ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
  // })

  // window.addEventListener('',()=>{
  //   headerRef.current.style.boxShadow = '0px'
  // })
  return (
    <header ref={headerRef}>
      <nav>
        <h1>we<span>Stream</span></h1>
        <div className='nav__items'>
            <Link to='/login'><p>Login</p></Link>
            <Link to='/signup'><button className='get_start_btn'>Get Started</button></Link>
        </div>
      </nav>
    </header>
  )
}

export default Header

import './admin.css'
import { Link, Outlet } from 'react-router-dom'

import React from 'react'
import menu_img from '/imgs/menu.png'

export default function Admin(){
    return (
        <>  
            
            <header className="admin--header">
                <Link to='/admin' style={{ textDecoration: 'none' }}><button className="admin--homebutton">
                <img src={menu_img} className='header--homebutton--img' />
                    <h3  className='header--homebutton--text'>Home</h3>
                </button></Link>
                <h3 className='header--title'>CHSS CHATTANCHAL</h3>

            </header>

        </>
    )
}
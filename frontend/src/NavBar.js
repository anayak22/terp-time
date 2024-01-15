import React from "react";
import './NavBar.css'
import TimeStamp from './TimeStamp'

const NavBar = () => {
    const info= TimeStamp();
    return (
        <nav className="nav">
            <h2 className="site-title">TerpTime</h2>
            < h2 id="current">{info.date.toUpperCase()}: {info.time}</h2>
            
        </nav>
    )
}
export default NavBar;
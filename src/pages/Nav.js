import '../App.css';
import React from "react";
import { Link } from "react-router-dom";



function Nav() {
    return (
        <header>
            <nav id="nav">
                <Link to="/">Home</Link>
                <Link to="/alarm">Alarm</Link>
                <Link to="/stopwatch">StopWatch</Link>
                <Link to="/weather">Weather</Link>
                <Link to="/guestbook">GuestBook</Link>
            </nav>
        </header>
    )
}

export default Nav
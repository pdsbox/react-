import '../App.css';
import React from "react";
import { Link, useLocation } from "react-router-dom";



function Nav() {
    return (
        <header>
            <nav id="nav">
                <Link to="/">Home</Link>
                <Link to="/Alarm">Alarm</Link>
                <Link to="/Timer">Timer</Link>
                <Link to="/Checklist">CheckList</Link>
                <Link to="/Weather">Weather</Link>
            </nav>
        </header>
    )
}

export default Nav
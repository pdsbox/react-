import '../App.css';
import React from "react";
import { Link } from "react-router-dom";

function Nav() {
    return (
        <header>
            <nav id="nav">
                <Link to="/">Home</Link>
                <Link to="/Alarm">Alarm</Link>
                <Link to="/timer">Timer</Link>
                <Link to="/CheckList">CheckList</Link>
                <Link to="/weather">Weather</Link>
            </nav>
        </header>
    )
}

export default Nav
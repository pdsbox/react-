import '../App.css';
import React from "react";
import { Link } from "react-router-dom";



function Nav() {
    return (
        <header>
            <nav id="nav">
                <Link to="/">Home</Link>
                <Link to="/Alarm">Alarm</Link>
                <Link to="/StopWatch">StopWatch</Link>
                <Link to="/Checklist">CheckList</Link>
                <Link to="/Weather">Weather</Link>
            </nav>
        </header>
    )
}

export default Nav
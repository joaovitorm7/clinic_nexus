import React from "react";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo-navbar">Clínica Nexus</div>

            <ul className="navbar-links">
                <li><a href="#" id="">Recpção</a></li>
                <li><a href="#" id="">Ala Médica</a></li>
                <li><a href="#" id="">Administração</a></li>
            </ul>
        </nav>
    );
}
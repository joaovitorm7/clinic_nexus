import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo-navbar">Clínica Nexus</div>

            <ul className="navbar-links">
                <li><Link to="/recepcao">Recepção</Link></li>
                <li><Link to="/ala-medica">Ala Médica</Link></li>
                <li><Link to="/administracao">Administração</Link></li>
            </ul>
        </nav>
    );
}
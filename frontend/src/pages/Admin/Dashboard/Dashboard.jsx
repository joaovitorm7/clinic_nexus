import React from "react";
import Navbar from "../../../components/Navbar/Navbar.jsx";

export default function Dashboard() {
    return (
        <div>
            <Navbar />
            <div style={{ paddingTop: "70px" }}>
                <h1>Painel Administrativo</h1>
            </div>
        </div>
    );
}
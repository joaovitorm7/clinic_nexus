import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../Navbar/Navbar';

function ProtectedRoute(){
    const {user, loading} = useAuth();
    if (loading){
        return <div style={{textAlign: 'center', padding: '100px', fontSize: '1.2em'}}>Verificando autenticação...</div>;
    }
    if (!user){
        return <Navigate to="/login" replace />;
    }
    return(
        <>
            <Navbar />
            <Outlet />
        </>
    );
}
export default ProtectedRoute;
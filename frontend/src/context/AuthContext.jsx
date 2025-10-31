import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';
const AuthContext = createContext();
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
});

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [loading, setLoading] = useState(false); //pra indicar se está em processo de login
    const login=async(email,senha)=>{
        setLoading(true);
        try{
            const response = await api.post('/auth/login', { email, senha });
            const userData = response.data.usuario;
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            setLoading(false);
            return true;
        }catch(error){
            setLoading(false);
            throw new Error(error.response?.data?.message || 'Erro ao conectar com a API ou credenciais inválidas.');
        }
    };


    const logout = ()=>{
        localStorage.removeItem('user');
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);
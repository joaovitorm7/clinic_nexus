import "./Login.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const API_BASE_URL = 'http://localhost:3000';

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [lembrar, setLembrar] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login, user } = useAuth();
    const navigate = useNavigate();
    if (user) {
        return <Navigate to="/" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMensagem("");

        try {
            if (!email || !senha) {
                setMensagem("Por favor, preencha E-mail e Senha.");
                setIsLoading(false);
                return;
            }

            const resp = await axios.post(`${API_BASE_URL}/auth/login`, { email, senha });

            login(resp.data.usuario);
            setMensagem("Login realizado com sucesso!");
        } catch (error){
            console.error("Erro de login:", error.response ? error.response.data : error.message);
            let erroMsg = "Erro ao realizar login. Verifique suas credenciais.";
            if (error.response && error.response.status === 401) {
                erroMsg = "Credenciais inválidas. Tente novamente.";
            }else if(error.code === 'ERR_NETWORK'){
                erroMsg = "Erro de conexão. Verifique se o servidor NestJS (porta 3000) está ativo.";
            }
            setMensagem(erroMsg);
        } finally {
            setIsLoading(false);
        }
    };
    return(
        <div className="login-container">
            <div className="login-left">
            <div className="left-header">
                <h1>Clínica Médica Nexus</h1>
            </div>

            <div className="left-content">
                <p>Bem-Vindo(a) ao <br /> Sistema da Clínica Nexus.</p>
                <p>Onde a saúde encontra a tecnologia.<br />Otimizamos o dia a dia dos nossos profissionais <br /> com serviços automatizados e inteligentes.</p>
            </div>

            <div className="left-footer">
                Desenvolvido por Nexus Group
            </div>
            </div>

            <div className="login-right">
            <div className="login-box">
                <h2>Login</h2>
                <p>Realize o login para acessar o sistema</p>
                <form>
                <input type="email" placeholder="E-mail" />
                <input type="password" placeholder="Senha" />
                <div className="remember-me">
                    <input type="checkbox" id="lembrar" />
                    <label htmlFor="lembrar">Lembrar-me</label>
                </div>
                <button type="submit">Entrar</button>
                </form>
                <div className="login-links">
                  <button type="button" className="register-btn" onClick={() => navigate("/register")}>
                    Registrar-se
                  </button>
                  {" | "}
                  <button type="button" className="register-btn" onClick={() => navigate("#")}>
                    Recuperar senha
                  </button>
                </div>

            </div>
            </div>
        </div>
    );
}
export default Login;
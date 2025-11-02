import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function Login() {
  const { user, login } = useAuth(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  
if (user) {
  switch (user.tipo?.toLowerCase()) {
    case "administrador":
      return <Navigate to="/administracao" replace />;
    case "medico":
      return <Navigate to="/medico" replace />;
    case "recepcionista":
      return <Navigate to="/recepcionista" replace />;
    default:
      return <Navigate to="/" replace />;
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMensagem("");

    if (!email || !senha) {
      setMensagem("Por favor, preencha E-mail e Senha.");
      setIsLoading(false);
      return;
    }

    try {
      const usuario = await login(email, senha, lembrar);

      switch (usuario.tipo?.toLowerCase()) {
        case "administrador":
          navigate("/administracao");
          break;
        case "medico":
          navigate("/medico");
          break;
        case "recepcionista":
          navigate("/recepcionista");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      let erroMsg = "Erro ao realizar login. Verifique suas credenciais.";
      if (error.message) {
        erroMsg = error.message;
      }
      setMensagem(erroMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <div className="remember-me">
              <input type="checkbox" id="lembrar"checked={lembrar} onChange={() => setLembrar(!lembrar)} />
              <label htmlFor="lembrar">Lembrar-me</label>
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>
          {mensagem && <p className="mensagem">{mensagem}</p>}
          <div className="login-links">
            <button
              type="button"
              className="register-btn"
              onClick={() => navigate("/register")}
            >
              Registrar-se
            </button>
            {" | "}
            <button
              type="button"
              className="register-btn"
              onClick={() => navigate("#")}
            >
              Recuperar senha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

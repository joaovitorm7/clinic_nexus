import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

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
      const resposta = await login(email, senha, lembrar);

      const cargo = resposta?.cargo?.toLowerCase();
      console.log("Cargo detectado:", cargo);
      console.log(resposta)

      switch (cargo) {
        case "administrador":
          navigate("/administracao", { replace: true });
          break;

        case "médico":
          navigate("/alamedica", { replace: true });
          break;

        case "recepcionista":
          navigate("/recepcao", { replace: true });
          break;

        default:
          navigate("/", { replace: true });
      }
    } catch (error) {
      setMensagem(
        error.message || "Erro ao realizar login. Verifique suas credenciais."
      );
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
          <p>
            Bem-Vindo(a) ao <br /> Sistema da Clínica Nexus.
          </p>
          <p>
            Onde a saúde encontra a tecnologia.
            <br />
            Otimizamos o dia a dia dos nossos profissionais <br />
            com serviços automatizados e inteligentes.
          </p>
        </div>
        <div className="left-footer">Desenvolvido por Nexus Group</div>
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

            <div className="input-senha">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              <button
                type="button"
                className="toggle-senha"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {mostrarSenha ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <div className="remember-me">
              <input
                type="checkbox"
                id="lembrar"
                checked={lembrar}
                onChange={() => setLembrar(!lembrar)}
              />
              <label htmlFor="lembrar">Lembrar-me</label>
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {mensagem && <p className="mensagem">{mensagem}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;

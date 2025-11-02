import "./Register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:3000";

function Register() {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [crm, setCrm] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [cargo, setCargo] = useState("");
    const [status, setStatus] = useState("ativo");
    const [mensagem, setMensagem] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    if (user) {
        return <Navigate to="/" replace />;
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMensagem("");

        try {
            if (!nome || !cpf || !crm || !telefone || !dataNascimento || !cargo) {
            setMensagem("Por favor, preencha todos os campos.");
            setIsLoading(false);
            return;
            }

            const novoUsuario = {nome, cpf, crm, telefone, dataNascimento, cargo, status,};

            await axios.post(`${API_BASE_URL}/usuarios`, novoUsuario);

            setMensagem("Usuário registrado com sucesso!");
            setTimeout(() => navigate("/login"), 2000);
        }catch (error){
            console.error("Erro ao registrar:", error.response ? error.response.data : error.message);
            let erroMsg = "Erro ao registrar. Verifique os dados.";
            if (error.code === "ERR_NETWORK"){
            erroMsg = "Erro de conexão. Verifique se o servidor NestJS (porta 3000) está ativo.";}
            setMensagem(erroMsg);
        }finally{
            setIsLoading(false);
        }
    };

    const handleCancel = () => {navigate("/login");};

return (
<div className="register-container">
    <div className="registrer-wrepper">
        <div className = "title-pag">
            <h1>CLÍNICA MÉDICA NEXUS</h1>
            <h2>Registrar-se</h2>
        </div>

        <div className="register-box">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="nome">Nome completo</label>
            <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome completo"
            />
            </div>

            <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input
                type="text"
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
            />
            </div>

            <div className="form-group">
            <label htmlFor="crm">CRM</label>
            <input
                type="text"
                id="crm"
                value={crm}
                onChange={(e) => setCrm(e.target.value)}
                placeholder="Digite o CRM"
            />
            </div>

            <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
                type="tel"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(00) 00000-0000"
            />
            </div>

            <div className="form-group">
            <label htmlFor ="dataNascimento">Data de nascimento</label>
            <input
                type="date"
                id="dataNascimento"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
            />
            </div>

            <div className="form-group">
            <label htmlFor="cargo">Cargo</label>
            <input
                type="text"
                id="cargo"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                placeholder="Ex: Médico, Recepcionista..."
            />
            </div>

            <div className="form-group status">
            <label>Status</label>
            <div className="status-options">
                <label>
                <input
                    type="radio"
                    name="status"
                    value="ativo"
                    checked={status === "ativo"}
                    onChange={(e) => setStatus(e.target.value)}
                />
                Ativo
                </label>
                <label>
                <input
                    type = "radio"
                    name = "status"
                    value = "inativo"
                    checked={status === "inativo"}
                    onChange={(e) => setStatus(e.target.value)}
                />
                Inativo
                </label>
            </div>
            </div>

            {mensagem && <p className="mensagem">{mensagem}</p>}

            <div className="button-group">
            <button type="submit" className="btn-save" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar"}
            </button>
                <button type="button" className="btn-cancel" onClick={handleCancel}>Cancelar</button>
            </div>
        </form>
        </div>
        </div>
</div>
);
}

export default Register;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, senha, navigate);
    } catch (err) {
      console.error(err);
      setError("Credenciais inválidas");
    }
  };
  return (
      <h1>login</h1>
  );
}

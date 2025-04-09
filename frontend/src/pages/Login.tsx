import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";
import api from "../services/api";
import { AxiosError } from "axios";


type UserType = {
  nome: string;
  email: string;
};

function Login({ setUser }: { setUser: (user: UserType) => void }) {
  const [emailOuCpf, setEmailOuCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const realizarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const isCpf = /^\d{11}$/.test(emailOuCpf.replace(/\D/g, ""));

      const payload = isCpf
        ? { cpf: emailOuCpf, senha: password }
        : { email: emailOuCpf, senha: password };

      const response = await api.post("/login", payload);

      const { token, nome, id } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("nomeUsuario", nome);
      localStorage.setItem("usuario_id", id);

      setUser({ nome, email: emailOuCpf });
      navigate("/home");
    } catch (err: unknown) {
      const error = err as AxiosError<{ error: string }>;
      setError(error.response?.data?.error || "Erro ao fazer login!");
    }
  };

  return (
    <div className="login-container">
      <title>Login - Aluga Aí Zé</title>
      <link rel="icon" type="image/png" href="../images/favicon.jpg"></link>
      <div className="login-box">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={realizarLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="E-mail ou CPF"
              value={emailOuCpf}
              onChange={(e) => setEmailOuCpf(e.target.value)}
              className="input-grande"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-grande"
            />
          </div>
          <button type="submit" className="login-button pequeno">
            Entrar
          </button>
        </form>

        <Link to="/esqueci-senha" className="forgot-password">
          Esqueci minha senha
        </Link>

        <Link to="/cadastro" className="signup-link">
          Criar uma conta
        </Link>
      </div>
    </div>
  );
}

export default Login;

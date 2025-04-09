import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Cadastro.css";
import background from "../images/background.jpg";

function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCPF] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Criando o useNavigate

  const cadastrarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !cpf || !password || !confirmPassword) {
      setError("Preencha todos os campos!");
      return;
    }

    // Validação de e-mail mais robusta com regex simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("E-mail inválido!");
      return;
    }

    // Validação de CPF (11 números)
    const cpfNumeros = cpf.replace(/\D/g, ""); // remove caracteres não numéricos
    if (cpfNumeros.length !== 11) {
      setError("CPF inválido! Deve conter 11 números.");
      return;
    }

    // Validação de senha
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/usuarios", {
        nome: name,
        email,
        cpf: cpfNumeros,
        senha: password,
      });

      if (response.status === 201) {
        navigate("/"); // Redireciona para a tela de login após cadastro
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); // erro vindo do back
      } else {
        setError("Erro ao cadastrar usuário. Tente novamente.");
      }
    }
  };

  return (
    <div
      className="cadastro-container"
      style={{ backgroundImage: `url(${background})` }}
    >
      <title>Cadastro - Aluga Aí Zé</title>
      <div className="cadastro-box">
        <h1>Cadastro</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={cadastrarUsuario}>
          <div className="input-group">
            <input
              className="input-medio"
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              className="input-medio"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              className="input-medio"
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCPF(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              className="input-medio"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              className="input-medio"
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="cadastro-button pequeno">
            Cadastrar
          </button>
        </form>
        <Link to="/" className="login-link">
          Já tem uma conta? Faça login
        </Link>
      </div>
    </div>
  );
}

export default Cadastro;

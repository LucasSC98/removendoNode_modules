import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const nomeSalvo = localStorage.getItem("nomeUsuario");

    if (!token) {
      navigate("/login");
      return;
    }

    setNomeUsuario(nomeSalvo || "Usuário");
  }, [navigate]);

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>
          Olá, <span className="user-name">{nomeUsuario}</span>!
        </h1>
        <p className="welcome-text">Bem-vindo ao seu painel de controle de Locações</p>
      </div>
    </div>
  );
}

export default Home;

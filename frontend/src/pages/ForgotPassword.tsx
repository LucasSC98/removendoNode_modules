import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [isCounting, setIsCounting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isCounting && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      navigate("/");
    }
  }, [countdown, isCounting, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setMessage("E-mail inválido. Insira um e-mail válido.");
      return;
    }

    setMessage("E-mail enviado! Redirecionando para o login...");
    setIsCounting(true);
  };

  return (
    <div className="forgot-password-container">
      <title>Redefinir Senha - Aluga Aí Zé</title>
      <div className="forgot-password-box">
        <h1>Redefinir Senha</h1>
        {message && <p className="success-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className="input-medio"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="redefinir-button pequeno">
            Enviar
          </button>
        </form>

        {isCounting && (
          <div className="countdown-container">
            <p>Redirecionando em {countdown} segundos...</p>
            <div className="countdown-bar">
              <div
                className="countdown-progress"
                style={{ width: `${(countdown / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <Link to="/" className="login-link">
          Voltar para o login
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/home";
import Usuarios from "./pages/Usuarios";
import Locadoras from "./pages/Locadoras";
import Veiculos from "./pages/Veiculos";
import VeiculoDetalhes from "./pages/VeiculoDetalhes";
import Categorias from "./pages/Categorias";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./components/PrivateRoutes";
import MinhaConta from "./pages/MinhaConta";
import "./styles/App.css";

type UserType = {
  nome: string;
  email: string;
};

function App() {
  const [user, setUser] = useState<UserType | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se existe um token ao carregar a aplicação
  useEffect(() => {
    const token = localStorage.getItem("token");
    const nomeUsuario = localStorage.getItem("nomeUsuario");

    if (token && nomeUsuario) {
      // Se tiver token e nome de usuário, restaurar o estado do usuário
      setUser({
        nome: nomeUsuario,
        email: "", // Como não temos o email salvo, deixamos vazio
      });
    }

    setIsLoading(false); // Marca que terminou de carregar
  }, []);

  // Enquanto está carregando, mostra uma tela de carregamento
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {user ? (
        <div className="app-container">
          <Sidebar
            isMinimized={isMinimized}
            setIsMinimized={setIsMinimized}
            user={user}
          />
          <main className={`main-content ${isMinimized ? "minimized" : ""}`}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />

              {/* Rotas protegidas com PrivateRoute */}
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/locadoras"
                element={
                  <PrivateRoute>
                    <Locadoras />
                  </PrivateRoute>
                }
              />
              <Route
                path="/categorias"
                element={
                  <PrivateRoute>
                    <Categorias />
                  </PrivateRoute>
                }
              />
              <Route
                path="/veiculos"
                element={
                  <PrivateRoute>
                    <Veiculos />
                  </PrivateRoute>
                }
              />
              <Route
                path="/veiculos/:id"
                element={
                  <PrivateRoute>
                    <VeiculoDetalhes />
                  </PrivateRoute>
                }
              />
              <Route
                path="/usuarios"
                element={
                  <PrivateRoute>
                    <Usuarios />
                  </PrivateRoute>
                }
              />
              <Route
                path="/minha-conta"
                element={
                  <PrivateRoute>
                    <MinhaConta
                      user={
                        user || {
                          nome: localStorage.getItem("nomeUsuario") || "",
                        }
                      }
                      setUser={setUser}
                    />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      ) : (
        <div className="auth-container">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/esqueci-senha" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;

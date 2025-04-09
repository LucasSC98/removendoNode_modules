import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiKey, FiLayers, FiUser } from "react-icons/fi";
import "../styles/Sidebar.css";
import { FaCarRear } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import Swal from "sweetalert2";

interface SidebarProps {
  isMinimized: boolean;
  setIsMinimized: (value: boolean) => void;
  user: { nome: string };
}

function Sidebar({ isMinimized, setIsMinimized, user }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você será desconectado do sistema!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#cc0000",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, sair!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.href = "/login";
      }
    });
  };

  const handleMinhaConta = () => {
    navigate("/minha-conta");
  };

  return (
    <div className={`sidebar ${isMinimized ? "minimized" : ""}`}>
      <button
        className="menu-toggle"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <IoMenu size={32} className="menu-icon" />
      </button>

      {!isMinimized && (
        <div className="user-profile">
          <button
            className="user-profile-button"
            onClick={handleMinhaConta}
            title="Editar perfil"
          >
            <FiUser className="profile-icon" />
            {user?.nome || "Usuário"}
          </button>
        </div>
      )}
      <div className="sideBar">
      <ul>
        <div className="sideBarHome">
        <li>
          <NavLink to="/home">
            <FiHome size={24} />
            {!isMinimized && <span>Home</span>}
          </NavLink>
        </li>
        </div>
        {/* <li>
          <NavLink to="/usuarios">
            <FiUsers size={24} />
            {!isMinimized && <span>Usuários</span>}
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/locadoras">
            <FiKey size={24} />
            {!isMinimized && <span>Locadoras</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/categorias">
            <FiLayers size={24} />
            {!isMinimized && <span>Categorias</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/veiculos">
            <FaCarRear size={24} />
            {!isMinimized && <span>Veículos</span>}
          </NavLink>
        </li>
      </ul>
      </div>

      <div className="button">
      <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt size={30} />
            {!isMinimized && <span>Sair</span>}
          </button>
          </div>
    </div>
  );
}

export default Sidebar;

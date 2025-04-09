// src/pages/Usuarios.tsx
import { useState, useEffect, useCallback } from "react";
import "../styles/Usuarios.css";
import { FiTrash, FiEdit } from "react-icons/fi";
import api from "../services/api";
import Modal from "../components/Modal";
import Swal from "sweetalert2";

export interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
}

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filtros, setFiltros] = useState({
    nome: "",
    cpf: "",
    email: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);

  const obterUsuarios = useCallback(async () => {
    try {
      const response = await api.get("/usuarios", { params: filtros });
      setUsuarios(response.data);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Erro ao carregar usuários!",
        confirmButtonColor: "#007bff",
      });
    }
  }, [filtros]);

  useEffect(() => {
    obterUsuarios();
  }, [obterUsuarios]);

  const limparFiltros = () => {
    setFiltros({ nome: "", cpf: "", email: "" });
  };

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const deletarUsuario = async (id: number) => {
    const confirmacao = await Swal.fire({
      icon: "warning",
      title: "Tem certeza?",
      text: "Você deseja realmente excluir este usuário?",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
    });

    if (!confirmacao.isConfirmed) return;

    try {
      await api.delete(`/usuarios/${id}`);
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Usuário excluído com sucesso!",
        confirmButtonColor: "#28a745",
      });
      obterUsuarios();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Erro ao excluir usuário!",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <div className="usuarios-container">
      <h1 className="titulo-filtro">Usuários</h1>

      <div className="filtros">
        <div className="filtro-inputs">
          <input
            name="nome"
            placeholder="Nome"
            value={filtros.nome}
            onChange={handleFiltroChange}
          />
          <input
            name="cpf"
            placeholder="CPF"
            value={filtros.cpf}
            onChange={handleFiltroChange}
          />
          <input
            name="email"
            placeholder="E-mail"
            value={filtros.email}
            onChange={handleFiltroChange}
          />
        </div>
        <div className="filtro-botoes">
          <button
            className="btn-adicionar"
            onClick={() => {
              setUsuarioEditando(null);
              setModalOpen(true);
            }}
          >
            Adicionar
          </button>
          <button className="btn-limpar" onClick={limparFiltros}>
            Limpar
          </button>
        </div>
      </div>

      <div className="usuarios-tabela-container">
        <table className="usuarios-tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.cpf}</td>
                <td>{usuario.email}</td>
                <td className="acoes">
                  <button
                    className="btn-acao"
                    title="Editar"
                    onClick={() => {
                      setUsuarioEditando(usuario);
                      setModalOpen(true);
                    }}
                  >
                    <FiEdit color="orange" />
                  </button>
                  <button
                    className="btn-acao"
                    title="Excluir"
                    onClick={() => deletarUsuario(usuario.id)}
                  >
                    <FiTrash color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          usuario={usuarioEditando}
          onClose={() => setModalOpen(false)}
          atualizarLista={obterUsuarios}
        />
      )}
    </div>
  );
};

export default Usuarios;

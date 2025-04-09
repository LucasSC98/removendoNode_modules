import { useEffect, useState } from "react";
import { Usuario } from "../pages/Usuarios";
import "../styles/Modal.css";
import api from "../services/api";
import Swal from "sweetalert2";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  atualizarLista: () => Promise<void>;
  usuario: Usuario | null;
}

const Modal = ({ isOpen, onClose, atualizarLista, usuario }: ModalProps) => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome || "");
      setCpf(usuario.cpf || "");
      setEmail(usuario.email || "");
    } else {
      setNome("");
      setCpf("");
      setEmail("");
    }
    setSenha("");
    setConfirmarSenha("");
  }, [usuario]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!nome || !cpf || !email || !senha || senha !== confirmarSenha) {
      Swal.fire({
        icon: "warning",
        title: "Campos inválidos",
        text: "Preencha todos os campos corretamente.",
      });
      return;
    }

    try {
      if (usuario) {
        await api.put(`/usuarios/${usuario.id}`, {
          nome,
          cpf,
          email,
          senha,
        });
        Swal.fire({
          icon: "success",
          title: "Usuário atualizado",
          text: "Dados atualizados com sucesso!",
        });
      } else {
        await api.post("/usuarios", { nome, cpf, email, senha });
        Swal.fire({
          icon: "success",
          title: "Usuário cadastrado",
          text: "Cadastro realizado com sucesso!",
        });
      }

      await atualizarLista();
      onClose();
    } catch (error: any) {
      const mensagemErro =
        error.response?.data?.error || "Erro ao salvar usuário.";
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: mensagemErro,
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{usuario ? "Editar Usuário" : "Adicionar Usuário"}</h2>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />

        <div className="modal-buttons">
          <button className="btn-confirm" onClick={handleSubmit}>
            Salvar
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

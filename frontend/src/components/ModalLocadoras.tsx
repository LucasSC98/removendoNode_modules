// src/components/ModalLocadora.tsx
import "../styles/Modal.css";
import { useState, useEffect } from "react";
import { Locadora } from "../pages/Locadoras";
import api from "../services/api";
import Swal from "sweetalert2";

interface ModalLocadoraProps {
  isOpen: boolean;
  onClose: () => void;
  atualizarLista: () => Promise<void>;
  locadora: Locadora | null;
}

const ModalLocadora = ({
  isOpen,
  onClose,
  atualizarLista,
  locadora,
}: ModalLocadoraProps) => {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  useEffect(() => {
    if (locadora) {
      setNome(locadora.nome);
      setCidade(locadora.cidade);
      setEstado(locadora.estado);
    } else {
      setNome("");
      setCidade("");
      setEstado("");
    }
  }, [locadora]);

  const handleSalvar = async () => {
    if (!nome || !cidade || !estado) {
      Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Preencha todos os campos antes de salvar.",
      });
      return;
    }

    try {
      if (locadora) {
        await api.put(`/locadoras/${locadora.id}`, { nome, cidade, estado });
        Swal.fire({
          icon: "success",
          title: "Locadora atualizada",
          text: "Locadora atualizada com sucesso!",
        });
      } else {
        await api.post("/locadoras", { nome, cidade, estado });
        Swal.fire({
          icon: "success",
          title: "Locadora cadastrada",
          text: "Locadora cadastrada com sucesso!",
        });
      }
      await atualizarLista();
      onClose();
    } catch (error: unknown) {
      const errorMsg =
        typeof error === "object" && error !== null && "response" in error
          ? (error as any).response?.data?.message || "Erro ao salvar locadora!"
          : "Erro ao salvar locadora!";

      Swal.fire({
        icon: "error",
        title: "Erro",
        text: errorMsg,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{locadora ? "Editar Locadora" : "Adicionar Locadora"}</h2>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        />

        <div className="modal-buttons">
          <button className="btn-confirm" onClick={handleSalvar}>
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

export default ModalLocadora;

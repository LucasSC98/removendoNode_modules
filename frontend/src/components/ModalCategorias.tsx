import "../styles/Modal.css";
import { useState, useEffect } from "react";
import { Categoria } from "../pages/Categorias";
import api from "../services/api";
import Swal from "sweetalert2";

interface ModalCategoriaProps {
  isOpen: boolean;
  onClose: () => void;
  atualizarLista: () => Promise<void>;
  categoria: Categoria | null;
}

const ModalCategoria = ({
  isOpen,
  onClose,
  atualizarLista,
  categoria,
}: ModalCategoriaProps) => {
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (categoria) {
      setNome(categoria.nome);
    } else {
      setNome("");
    }
  }, [categoria]);

  const handleSalvar = async () => {
    if (!nome.trim()) {
      Swal.fire("Aviso", "Preencha o nome da categoria.", "warning");
      return;
    }

    try {
      if (categoria) {
        await api.put(`/categorias/${categoria.id}`, { nome });
        Swal.fire("Sucesso", "Categoria atualizada com sucesso!", "success");
      } else {
        await api.post("/categorias", { nome });
        Swal.fire("Sucesso", "Categoria cadastrada com sucesso!", "success");
      }
      await atualizarLista();
      onClose();
    } catch {
      Swal.fire("Erro", "Erro ao salvar categoria!", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{categoria ? "Editar Categoria" : "Adicionar Categoria"}</h2>

        <input
          type="text"
          placeholder="Nome da Categoria"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
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

export default ModalCategoria;

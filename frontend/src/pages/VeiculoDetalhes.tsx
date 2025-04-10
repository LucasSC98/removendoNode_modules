import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiTag, FiCalendar, FiDollarSign, FiMapPin, FiCheck, FiX } from "react-icons/fi";
import api from "../services/api";
import Swal from "sweetalert2";
import "../styles/VeiculoDetalhes.css";

interface VeiculoDetalhes {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  preco_por_dia: number;
  imagem: string;
  categoria_id: number;
  locadora_id: number;
  alugado: boolean;
}

interface Categoria {
  id: number;
  nome: string;
}

interface Locadora {
  id: number;
  nome: string;
}

const VeiculoDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [veiculo, setVeiculo] = useState<VeiculoDetalhes | null>(null);
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [locadora, setLocadora] = useState<Locadora | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obterDetalhesVeiculo = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/veiculos/${id}`);
        console.log('Dados do veículo:', response.data);
        setVeiculo(response.data);

        // Buscar categoria
        if (response.data.categoria_id) {
          const categoriaResponse = await api.get(`/categorias/${response.data.categoria_id}`);
          console.log('Categoria:', categoriaResponse.data);
          setCategoria(categoriaResponse.data);
        }

        // Buscar locadora
        if (response.data.locadora_id) {
          const locadoraResponse = await api.get(`/locadoras/${response.data.locadora_id}`);
          console.log('Locadora:', locadoraResponse.data);
          setLocadora(locadoraResponse.data);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        Swal.fire("Erro", "Não foi possível carregar os detalhes do veículo", "error");
        navigate("/veiculos");
      } finally {
        setLoading(false);
      }
    };

    obterDetalhesVeiculo();
  }, [id, navigate]);

  const formatarPlaca = (placa: string) => {
    return placa.replace(/([A-Z]{3})([0-9]{4})/, "$1-$2");
  };


  if (loading) {
    return (
      <div className="detalhes-loading">
        <p>Carregando detalhes do veículo...</p>
      </div>
    );
  }

  if (!veiculo) {
    return (
      <div className="detalhes-error">
        <p>Veículo não encontrado</p>
        <button onClick={() => navigate("/veiculos")}>Voltar para lista</button>
      </div>
    );
  }

  return (
    <div className="detalhes-container">
      <div className="detalhes-header">
        <button className="detalhes-voltar" onClick={() => navigate("/veiculos")}>
          <FiArrowLeft /> Voltar
        </button>
        <h1>Detalhes do Veículo</h1>
        <button className="detalhes-fechar" onClick={() => navigate("/veiculos")}>
          <FiX />
        </button>
      </div>

      <div className="detalhes-content">
        <div className="detalhes-imagem-container">
          <img
            src={veiculo.imagem || "/placeholder.svg"}
            alt={`${veiculo.marca} ${veiculo.modelo}`}
            className="detalhes-imagem"
          />
        </div>

        <div className="detalhes-info">
          <h2 className="detalhes-titulo">
            {veiculo.marca} {veiculo.modelo}
          </h2>

          <div className="detalhes-status">
            <span className={`detalhes-status-badge ${veiculo.alugado ? "alugado" : "disponivel"}`}>
              {veiculo.alugado ? (
                <>
                  <FiX /> Alugado
                </>
              ) : (
                <>
                  <FiCheck /> Disponível
                </>
              )}
            </span>
          </div>

          <div className="detalhes-grid">
            <div className="detalhes-item">
              <FiTag className="detalhes-icon" />
              <div>
                <span className="detalhes-label">Placa</span>
                <span className="detalhes-value">{formatarPlaca(veiculo.placa)}</span>
              </div>
            </div>

            <div className="detalhes-item">
              <FiCalendar className="detalhes-icon" />
              <div>
                <span className="detalhes-label">Ano</span>
                <span className="detalhes-value">{veiculo.ano}</span>
              </div>
            </div>

            <div className="detalhes-item">
              <FiDollarSign className="detalhes-icon" />
              <div>
                <span className="detalhes-label">Diária</span>
                <span className="detalhes-value">R$ {veiculo.preco_por_dia.toFixed(2)}</span>
              </div>
            </div>

            <div className="detalhes-item">
              <FiMapPin className="detalhes-icon" />
              <div>
                <span className="detalhes-label">Categoria</span>
                <span className="detalhes-value">{categoria?.nome || "-"}</span>
              </div>
            </div>

            <div className="detalhes-item">
              <FiMapPin className="detalhes-icon" />
              <div>
                <span className="detalhes-label">Locadora</span>
                <span className="detalhes-value">{locadora?.nome || "-"}</span>
              </div>
            </div>
          </div>

          {!veiculo.alugado && (
            <div className="detalhes-acoes">
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VeiculoDetalhes; 
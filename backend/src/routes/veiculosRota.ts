import express from 'express';
import { obterVeiculos, obterVeiculoPorId, criarVeiculo, atualizarVeiculo, deletarVeiculo } from "../controllers/veiculosController";
import { authMiddeleware } from '../middleware/authMiddleware'

const router = express.Router();

//rota para pegar todos os veículos
router.get("/veiculos", authMiddeleware, obterVeiculos)

//rota para pegar veículo por ID
router.get("/veiculos/:id", authMiddeleware, obterVeiculoPorId)

//rota para criar um veículo
router.post("/veiculos", authMiddeleware, criarVeiculo);

//rota para atualizar um veiculo
router.put("/veiculos/:id", authMiddeleware, atualizarVeiculo);

//rota para deletar veículo
router.delete("/veiculos/:id", authMiddeleware, deletarVeiculo)


export default router
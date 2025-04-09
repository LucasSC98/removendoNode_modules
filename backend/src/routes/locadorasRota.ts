import express from 'express';
import { obterLocadoras, obterLocadorasId, criarLocadora, atualizarLocadora, deletarLocadoraId } from "../controllers/locadoraController";
import { authMiddeleware } from '../middleware/authMiddleware'

const router = express.Router();

//rota para pegar todas as locadoras
router.get("/locadoras", authMiddeleware, obterLocadoras)

//rota para pegar locadora por id
router.get("/locadoras/:id", authMiddeleware, obterLocadorasId)

//rota para criar uma locadora
router.post("/locadoras", authMiddeleware, criarLocadora)

//rota para atualizar locadora
router.put("/locadoras/:id", authMiddeleware, atualizarLocadora)

//rota para deletar uma locadora
router.delete("/locadoras/:id", authMiddeleware, deletarLocadoraId);

export default router;
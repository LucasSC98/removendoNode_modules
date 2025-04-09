import express from 'express';
import {
  criarAluguel,
  atualizarDatasAluguel,
  deletarAluguel,
  obterAlugueis,
} from '../controllers/aluguelController';
import { authMiddeleware } from '../middleware/authMiddleware';

const router = express.Router();

// Criar um novo aluguel
router.post('/alugueis', authMiddeleware, criarAluguel);

// Atualizar datas de um aluguel existente
router.put('/alugueis/:id', authMiddeleware, atualizarDatasAluguel);

// Deletar um aluguel
router.delete('/alugueis/:id', authMiddeleware, deletarAluguel);

// (Opcional) Obter todos os aluguéis com info de usuário e veículo
router.get('/alugueis', authMiddeleware, obterAlugueis);

export default router;

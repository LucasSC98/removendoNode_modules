import { allowedNodeEnvironmentFlags } from "process";
import express from 'express';
import { obterCategorias, obterCategoriaId , criarCategoria, atualizarCategoria, deletarCategoriaId} from "../controllers/categoriaController";
import { authMiddeleware } from '../middleware/authMiddleware'

const router = express.Router();

//obter todas as categorias
router.get("/categorias", authMiddeleware, obterCategorias);

//obter categoria por ID
router.get("/categorias/:id", authMiddeleware, obterCategoriaId);

//criar uma categoria
router.post("/categorias", authMiddeleware, criarCategoria);

//atualizar uma categorai
router.put("/categorias/:id", authMiddeleware, atualizarCategoria);

//deletar uma categoria
router.delete("/categorias/:id", authMiddeleware, deletarCategoriaId);


export default router;
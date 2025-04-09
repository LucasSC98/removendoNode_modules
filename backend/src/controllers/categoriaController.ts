import { Request, Response } from "express";
import CategoriaModel from "../models/CategoriaModel";

//rota para pegar todas as categorias
export const obterCategorias = async (req: Request, res: Response) => {
    const categorias = await CategoriaModel.findAll();
    res.send(categorias);
  }

  //rota para pegar as categorias por ID
export const obterCategoriaId = async (req: Request< {id: string}>, res: Response) => {
    const categoria = await CategoriaModel.findByPk(req.params.id)
    
    return res.json(categoria);
}

//rota para criar uma categoria
export const criarCategoria = async (req: Request, res: Response) => {

    try {
        const { nome } = req.body

        if(!nome || nome === ''){
            return res.status(400)
            .json({error: 'Propiedade não pode ser vazio'})
        }
    
        const categoria = await CategoriaModel.create( { nome })
        res.status(201).json(categoria)
    } catch(error){
        res.status(500).json('Erro interno no servidor' + error);
    }
}

//rota para atualizar uma categoria
export const atualizarCategoria = async (req: Request< {id: string}>, res: Response) => {

    try {
        const { nome } = req.body

        if(!nome || nome === ''){
            return res.status(400)
            .json({error: 'Propiedade não pode ser vazio'})
        }
    
        const categoria = await CategoriaModel.findByPk(req.params.id)

        if(!categoria){
            return res.status(400)
            .json({error: 'Usuário não existe'})
        }

        categoria.nome = nome;

        await categoria.save()
        res.status(201).json(categoria)
    } catch(error){
        res.status(500).json('Erro interno no servidor' + error);
    }
}

//rota para deletar uma categoria
export const deletarCategoriaId =  async (req: Request <{id: string}>, res: Response) => {
    try{ 
    const categoria = await CategoriaModel.findByPk(req.params.id);
        if(!categoria){
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        await categoria.destroy();
        res.status(204).send();
    } catch(error){
        res.status(500).json({ error: 'Erro interno no sevidor' + error});
    }
}
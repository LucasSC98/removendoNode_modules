import { Request, Response } from "express";
import LocadorasModel from "../models/LocadorasModel";

//rota para pegar todas as locadoras
export const obterLocadoras = async (req: Request, res: Response) => {
    const locadoras = await LocadorasModel.findAll();
    res.send(locadoras);
  }


    //rota para pegar as locadoras por ID
export const obterLocadorasId = async (req: Request< {id: string}>, res: Response) => {
    const locadoras = await LocadorasModel.findByPk(req.params.id)
    
    return res.json(locadoras);
}

//rota para criar uma locadora
export const criarLocadora = async (req: Request, res: Response) => {

    try {
        const { nome, cidade, estado } = req.body

        if(!nome || nome === ''){
            return res.status(400)
            .json({error: 'Propiedade não pode ser vazio'})
        }
    
        const locadora = await LocadorasModel.create( { nome, cidade, estado })
        res.status(201).json(locadora)
    } catch(error){
        res.status(500).json('Erro interno no servidor' + error);
    }
}

//rota para atualizar uma locadora
export const atualizarLocadora = async (req: Request< {id: string}>, res: Response) => {

    try {
        const { nome, cidade, estado } = req.body

        if(!nome || nome === ''){
            return res.status(400)
            .json({error: 'Propiedade não pode ser vazio'})
        }
    
        const locadora = await LocadorasModel.findByPk(req.params.id)

        if(!locadora){
            return res.status(400)
            .json({error: 'Usuário não existe'})
        }

        locadora.nome = nome;
        locadora.cidade = cidade;
        locadora.estado = estado;

        await locadora.save()
        res.status(201).json(locadora)
    } catch(error){
        res.status(500).json('Erro interno no servidor' + error);
    }
}

//rota para deletar uma locadora
export const deletarLocadoraId =  async (req: Request <{id: string}>, res: Response) => {
    try{ 
    const locadora = await LocadorasModel.findByPk(req.params.id);
        if(!locadora){
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        await locadora.destroy();
        res.status(204).send();
    } catch(error){
        res.status(500).json({ error: 'Erro interno no sevidor' + error});
    }
}
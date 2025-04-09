import { Request, Response } from "express";
import VeiculosModel from "../models/VeiculosModel";
import Categoria from "../models/CategoriaModel";  // Importando o modelo Categoria
import Locadora from "../models/LocadorasModel";  // Importando o modelo Locadora

export const obterVeiculos = async (req: Request, res: Response) => {
    try {
        const veiculos = await VeiculosModel.findAll({
            include: [
                {
                    model: Categoria,
                    as: 'categoria',  // Nome do relacionamento definido no modelo
                    attributes: ['id', 'nome'],  // Campos que você quer retornar de Categoria
                },
                {
                    model: Locadora,
                    as: 'locadora',  // Nome do relacionamento definido no modelo
                    attributes: ['id', 'nome'],  // Campos que você quer retornar de Locadora
                },
            ],
        });
        res.status(200).json(veiculos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar veículos: " + error });
    }
};
  
//Rota para pegar um veículo por ID
export const obterVeiculoPorId = async (req: Request<{ id: string }>, res: Response) => {
  try {
      const veiculo = await VeiculosModel.findByPk(req.params.id);
      if (!veiculo) {
          return res.status(404).json({ error: "Veículo não encontrado" });
      }
      res.status(200).json(veiculo);
  } catch (error) {
      res.status(500).json({ error: "Erro ao buscar veículo: " + error });
  }
};

//Rota para criar um veículo
export const criarVeiculo = async (req: Request, res: Response) => {
  try {
      const { marca, modelo, ano, placa, preco_por_dia, imagem, locadora_id, categoria_id } = req.body;

      if (!marca || !modelo || !ano || !placa || !preco_por_dia || !imagem || !locadora_id || !categoria_id) {
          return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      const veiculo = await VeiculosModel.create({ marca, modelo, ano, placa, preco_por_dia, imagem, locadora_id, categoria_id });
      res.status(201).json(veiculo);
  } catch (error) {
      res.status(500).json({ error: "Erro ao criar veículo: " + error });
  }
};

// Rota para atualizar um veículo por ID
export const atualizarVeiculo = async (req: Request<{ id: string }>, res: Response) => {
  try {
      const { marca, modelo, ano, placa, preco_por_dia, imagem, locadora_id, categoria_id } = req.body;
      
      const veiculo = await VeiculosModel.findByPk(req.params.id);
      if (!veiculo) {
          return res.status(404).json({ error: "Veículo não encontrado" });
      }

      veiculo.marca = marca;
      veiculo.modelo = modelo;
      veiculo.ano = ano;
      veiculo.placa = placa;
      veiculo.preco_por_dia = preco_por_dia;
      veiculo.imagem = imagem;
      veiculo.locadora_id = locadora_id;
      veiculo.categoria_id = categoria_id;

      await veiculo.save();
      res.status(200).json(veiculo);
  } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar veículo: " + error });
  }
};

//Rota para deletar um veículo por ID
export const deletarVeiculo = async (req: Request<{ id: string }>, res: Response) => {
  try {
      const veiculo = await VeiculosModel.findByPk(req.params.id);
      if (!veiculo) {
          return res.status(404).json({ error: "Veículo não encontrado" });
      }
      await veiculo.destroy();
      res.status(204).send();
  } catch (error) {
      res.status(500).json({ error: "Erro ao deletar veículo: " + error });
  }
};
import { Request, Response } from "express";
import AluguelModel from "../models/AluguelModel";
import UsuarioModel from "../models/UsuarioModel";
import VeiculosModel from "../models/VeiculosModel";

// Criar um aluguel
export const criarAluguel = async (req: Request, res: Response) => {
  try {
    const { usuario_id, veiculo_id, data_inicio, data_fim } = req.body;

    if (!usuario_id || !veiculo_id || !data_inicio || !data_fim) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const veiculo = await VeiculosModel.findByPk(veiculo_id);
    if (!veiculo) {
      return res.status(404).json({ error: "Veículo não encontrado" });
    }

    if (veiculo.alugado) {
      return res.status(400).json({ error: "Veículo já está alugado" });
    }

    const inicio = new Date(data_inicio);
    const fim = new Date(data_fim);
    const umDia = 24 * 60 * 60 * 1000;
    const dias = Math.ceil((fim.getTime() - inicio.getTime()) / umDia);

    if (dias <= 0) {
      return res
        .status(400)
        .json({ error: "A data final deve ser após a data inicial" });
    }

    const valor_total = dias * veiculo.preco_por_dia!;

    const aluguel = await AluguelModel.create({
      usuario_id,
      veiculo_id,
      data_inicio,
      data_fim,
      valor_total,
    });

    // Atualiza o status do veículo para alugado
    await VeiculosModel.update(
      { alugado: true },
      { where: { id: veiculo_id } }
    );

    res.status(201).json(aluguel);
  } catch (error) {
    console.error("Erro ao criar aluguel:", error);
    res.status(500).json({ error: "Erro ao criar aluguel" });
  }
};

// Atualizar datas do aluguel
export const atualizarDatasAluguel = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { data_inicio, data_fim } = req.body;

    const aluguel = await AluguelModel.findByPk(req.params.id);
    if (!aluguel) {
      return res.status(404).json({ error: "Aluguel não encontrado" });
    }

    const inicio = new Date(data_inicio);
    const fim = new Date(data_fim);
    const umDia = 24 * 60 * 60 * 1000;
    const dias = Math.ceil((fim.getTime() - inicio.getTime()) / umDia);

    if (dias <= 0) {
      return res
        .status(400)
        .json({ error: "A data final deve ser após a data inicial" });
    }

    const veiculo = await VeiculosModel.findByPk(aluguel.veiculo_id);
    if (!veiculo) {
      return res.status(404).json({ error: "Veículo não encontrado" });
    }

    const novoValorTotal = dias * veiculo.preco_por_dia!;

    aluguel.data_inicio = data_inicio;
    aluguel.data_fim = data_fim;
    aluguel.valor_total = novoValorTotal;

    await aluguel.save();

    res.status(200).json(aluguel);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar datas do aluguel: " + error });
  }
};

// Excluir aluguel
export const deletarAluguel = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const aluguel = await AluguelModel.findByPk(req.params.id);
    if (!aluguel) {
      return res.status(404).json({ error: "Aluguel não encontrado" });
    }

    // Libera o veículo (define alugado como false)
    const veiculo = await VeiculosModel.findByPk(aluguel.veiculo_id);
    if (veiculo) {
      await veiculo.update({ alugado: false });
    }

    await aluguel.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir aluguel: " + error });
  }
};

// rota para obter todos os aluguéis
export const obterAlugueis = async (req: Request, res: Response) => {
  try {
    const { veiculo_id, usuario_id } = req.query;

    const where: any = {};
    if (veiculo_id) where.veiculo_id = veiculo_id;
    if (usuario_id) where.usuario_id = usuario_id;

    const alugueis = await AluguelModel.findAll({
      where,
      include: [
        {
          model: UsuarioModel,
          as: "usuario",
          attributes: ["id", "nome", "email"],
        },
        {
          model: VeiculosModel,
          as: "veiculo",
          attributes: ["id", "marca", "modelo", "placa", "imagem"],
        },
      ],
    });

    res.status(200).json(alugueis);
  } catch (error) {
    console.error("Erro ao buscar aluguéis:", error);
    res.status(500).json({ error: "Erro ao buscar aluguéis" });
  }
};

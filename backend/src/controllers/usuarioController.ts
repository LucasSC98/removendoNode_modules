import { Request, Response } from "express";
import UsuarioModel from "../models/UsuarioModel";
import {
  validarCPF,
  validarEmail,
  validarSenhaForte,
} from "../utils/validacoes";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const userCache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 30000;

//rota para pegar todos os usuários
export const obterUsuarios = async (req: Request, res: Response) => {
  const usuarios = await UsuarioModel.findAll();
  res.send(usuarios);
};

//rota para pegar um usuário pelo id

export const obterUsuarioId = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const userId = req.params.id;
    const now = Date.now();

    const cachedUser = userCache[userId];
    if (cachedUser && now - cachedUser.timestamp < CACHE_TTL) {
      return res.json(cachedUser.data);
    }

    const usuario = await UsuarioModel.findByPk(userId);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    const usuarioSemSenha = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo,
      cpf: usuario.cpf,
    };
    userCache[userId] = {
      data: usuarioSemSenha,
      timestamp: now,
    };

    return res.json(usuarioSemSenha);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

//rota para criar um usuário
export const criarUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, cpf } = req.body;

    if (!nome || !email || !senha || !cpf) {
      return res.status(400).json({ error: "Nenhum campo pode estar vazio." });
    }

    if (!validarEmail(email)) {
      return res.status(400).json({ error: "E-mail inválido." });
    }

    if (!validarCPF(cpf)) {
      return res.status(400).json({ error: "CPF inválido." });
    }

    if (!validarSenhaForte(senha)) {
      return res.status(400).json({
        error:
          "A senha deve ter no mínimo 8 caracteres, 1 número, 1 letra maiúscula e 1 símbolo.",
      });
    }

    const usuario = await UsuarioModel.create({ nome, email, senha, cpf });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor: " + error });
  }
};

//rota para atualizar um usuário
export const atualizarUsuario = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { nome, cpf, senha, senha_atual } = req.body;

    // Buscar o usuário pelo ID
    const usuario = await UsuarioModel.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Se estiver tentando atualizar o nome
    if (nome && nome !== "") {
      usuario.nome = nome;
    }

    // Se estiver tentando atualizar o CPF
    if (cpf) {
      if (!validarCPF(cpf)) {
        return res.status(400).json({ error: "CPF inválido." });
      }
      usuario.cpf = cpf;
    }

    // Se estiver tentando atualizar a senha
    if (senha) {
      // Verificar se a senha atual foi fornecida
      if (!senha_atual) {
        return res
          .status(400)
          .json({ error: "Senha atual é necessária para alterar a senha." });
      }

      // Validar a senha atual
      const senhaValida = await usuario.validaSenha(senha_atual);
      if (!senhaValida) {
        return res.status(400).json({ error: "Senha atual incorreta." });
      }

      // Validar a força da nova senha
      if (!validarSenhaForte(senha)) {
        return res.status(400).json({
          error:
            "A senha deve ter no mínimo 8 caracteres, 1 número, 1 letra maiúscula e 1 símbolo.",
        });
      }

      usuario.senha = senha;
    }

    await usuario.save();

    // Retornar o usuário sem a senha
    const usuarioAtualizado = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      tipo: usuario.tipo,
    };

    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro interno no servidor: " + error });
  }
};

//rota para deletar um usuário
export const deletarUsuarioId = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const usuario = await UsuarioModel.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    await usuario.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro interno no sevidor" + error });
  }
};

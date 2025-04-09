import { Request, Response } from "express";
import UsuarioModel from "../models/UsuarioModel";
import {gerarToken} from "../utils/jwt"

export const loginUsuario = async (req: Request, res: Response) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400)
            .json({error: 'Email e Senha é obrigatório'})
    }

    const usuario = await UsuarioModel.findOne({ where: { email }})
    if (!usuario) {
        return res.status(404)
            .json({error: 'Usuário não existe'})
    }

    const eValidaSenha = await usuario.validaSenha(senha);
    if (!eValidaSenha) {
        return res.status(400)
            .json({error: 'Email ou Senha inválidos'})
    }

    const token = gerarToken(usuario);

    res.status(200).json({
        message: 'Bem-vindo ao sistema!',
        token,
        nome: usuario.nome, // Enviando o nome do usuário no login
        id: usuario.id
    });

}
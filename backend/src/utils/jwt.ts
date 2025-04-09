import jwt from 'jsonwebtoken'
import UsuarioModel from '../models/UsuarioModel'

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_do_segredo'
//quantidade de dias para a senha/token expirar 
const JWT_EXPIRES_IN = '7d';

export const gerarToken = (usuario: UsuarioModel): string => {
    return jwt.sign({usuario}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export const verificaToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET)
}
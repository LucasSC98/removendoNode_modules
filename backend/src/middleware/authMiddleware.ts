import { NextFunction, Request, Response } from "express";
import { verificaToken } from '../utils/jwt';

export const authMiddeleware = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {

    const token = req.header('Authorization')?.replace('Bearer ', '')

    if(!token) {
        return res.status(401).json({error: 'Acesso não permitido, não tem Token'})
    }

    try {
        const decoded: any = verificaToken(token);
        (req as any).usuario = decoded;
        next()
    } catch (error) {
        return res.status(401).json({msg: 'Acesso não permitido, token inválido!' + error})
    }
}
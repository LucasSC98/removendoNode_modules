import { defaultMaxListeners } from 'events';
import express from 'express';
import { loginUsuario} from '../controllers/loginController';

const router = express.Router();

router.post("/login", loginUsuario);

export default router;
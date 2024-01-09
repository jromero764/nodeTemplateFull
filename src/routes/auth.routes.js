import { Router } from "express";
import { Login,Test,sgspPing } from "../controllers/auth.controller";
import { getConstantes } from "../controllers/constants.controller";
import { Express } from "express";
const router = Router();

router.post('/login',Login);
router.get('/v1/constantes',getConstantes);
router.get('/',Test)
router.get('/sgspPing',sgspPing)
export default router;


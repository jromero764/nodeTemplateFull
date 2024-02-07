import { Router } from "express";
import { Login } from "../controllers/auth.controller";
import { Express } from "express";
const router = Router();

router.post('/login',Login);
export default router;


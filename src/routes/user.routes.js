import { Router } from "express";
import { getUser,getUserId, postUser, deleteUser } from "../controllers/user.controller";

const router = Router();


/**
 * @openapi
 * /usuarioSistema:
 *   get:
 *     summary: Obtiene todos los usuarios del sistema.
 *     tags:
 *       - Usuario del Sistema
 *     responses:
 *       200:
 *         description: Éxito al obtener usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 

 */


router.get('/usuarioSistema',getUser);
router.get('/usuarioSistema/:id',getUserId);
router.post('/usuarioSistema',postUser);
router.delete('/usuarioSistema/:id',deleteUser);

export default router;
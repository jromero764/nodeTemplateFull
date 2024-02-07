import { Router } from "express";

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



export default router;
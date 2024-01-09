import { generateToken } from "./jwt";
const { sequelize } = require('../../sequelizeConfig')
const { QueryTypes } = require('sequelize');
const model_usuario_sistema = require('../models/usuario_sistema.model');
const bcrypt = require('bcrypt');

export const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await model_usuario_sistema.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).json({ respuesta: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const roles = {
        1: 'administrador',
        2: 'supervisor',
        3: 'operador',
        4: 'administrativo',
        5: 'logistico',
        6: 'auditor',
        7: 'mantenimiento',
        8: 'instalador',
      };

      let rol = roles[user.id_rol] || 'Rol no definido';

      const token = generateToken({ userId: user.id_usuario_sistema, rol, username: user.username });
      return res.status(200).json({ token });

    } else {
      return res.status(401).json({ respuesta: 'Contraseña incorrecta' });
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ respuesta: 'Error en el servidor' });
  }
};
export const Test = async (req, res) => { return res.status(200).json({ status: 200 }) }

export const sgspPing = async (req, res) => {
  const response = {
    resultado: [],
    errores: [],
  };

  try {
    // Simulamos obtener Claims (puedes ajustar esto según tu autenticación)
    const claims = { subject: 'UsuarioEjemplo' };


    try {
      // Simulamos la llamada al servicio SOAP (ajusta esto a tu caso real)
      const pingResponse = sendPing(claims.subject);
      const result = pingResponse;

      response.resultado.push(result);
    } catch (error) {
      response.error = 'Error al intentar realizar ping al Ws de SGSP.';
      response.errores.push('Error al intentar realizar ping al Ws de SGSP.');
    }
  } catch (error) {
    response.errores.push('Error al intentar realizar ping al Ws de SGSP.');
  }

  res.status(200).json(response);
};

function sendPing(subject) {
  return 'Ping exitoso para ' + subject;
}

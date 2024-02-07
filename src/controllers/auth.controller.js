import { generateToken } from "./jwt";
const { sequelize } = require('../../sequelizeConfig')
const { QueryTypes } = require('sequelize');
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


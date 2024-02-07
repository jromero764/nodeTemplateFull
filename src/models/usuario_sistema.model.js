const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelizeConfig');

const model_usuario_sistema = sequelize.define('User', {
  id_usuario_sistema: {
    type: DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey: true
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  id_persona: {
    type: DataTypes.INTEGER,
  },
  id_rol: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  ignorar: {
    type: DataTypes.BOOLEAN,
  },
  unidad_ejecutora: {
    type: DataTypes.STRING,
    unique: true,
  },
  departamentos_visibles: {
    type: DataTypes.STRING,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    unique: true,
  }
},
  {
    tableName: 'usuario_sistema'
  }
);

module.exports = model_usuario_sistema;

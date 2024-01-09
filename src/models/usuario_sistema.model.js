const { DataTypes } = require('sequelize');
const { sequelize } = require('../../sequelizeConfig');

const model_persona = require('./persona.model');
const model_datos_personal = require('./datos_personal.model')
const model_rol = require('./rol.model')

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
model_usuario_sistema.belongsTo(model_persona, {
  foreignKey: 'id_persona', // Campo en el modelo UsuarioSistema que hace referencia a la persona
  as: 'persona', // Alias para la asociación
});
model_usuario_sistema.belongsTo(model_rol, {
  foreignKey: 'id_rol', // Cambié el campo de referencia
  as: 'rol',
});
model_usuario_sistema.hasOne(model_datos_personal,{
  foreignKey:'id_usuario_sistema'
})
module.exports = model_usuario_sistema;

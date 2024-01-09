const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:Sertec01@172.31.66.120:5432/Galme',{
    define:{
        timestamps:false
    },
    logging:false
})

const getConnections = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, getConnections };

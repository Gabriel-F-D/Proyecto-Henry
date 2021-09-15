const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('temperamento', {
        Nombre: {
          type: DataTypes.STRING,
          allowNull: false,
        }
    })
}
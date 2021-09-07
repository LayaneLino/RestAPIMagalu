// const { DataTypes } = require('sequelize', 'dataTypes')

const usuario = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        nome: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'usuario'    
    })
    return Usuario
}

module.exports = usuario
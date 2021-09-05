const fornecedor = (sequelize, DataTypes) => {
    const Fornecedor = sequelize.define('Fornecedor', {
        nome: {
            type: DataTypes.STRING
        },
    }, {
        tablename: 'fornecedor'    
    })
    return Fornecedor
}

module.exports = fornecedor
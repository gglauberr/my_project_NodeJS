const { Model, DataTypes } = require('sequelize')

class EmployeeModel extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            telefone: DataTypes.STRING,
            celular: DataTypes.STRING,
            logradouro: DataTypes.STRING,
            numero: DataTypes.STRING,
            complemento: DataTypes.STRING,
            cep: DataTypes.STRING,
            bairro: DataTypes.STRING,
            cidade: DataTypes.STRING,
            estado: DataTypes.STRING,
            email: DataTypes.STRING,
            ativo: DataTypes.BOOLEAN,
        },{
            sequelize,
            tableName: 'employees'
        })
    }

    static associate(models){
        this.belongsTo(models.UserModel, { foreignKey: 'user_id', as: 'user' })
    }
}

module.exports = EmployeeModel
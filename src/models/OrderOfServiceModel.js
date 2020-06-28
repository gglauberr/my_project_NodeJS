const { Model, DataTypes } = require('sequelize')

class OrderOfServicesModel extends Model{
    static init(sequelize){
        super.init({
            data_hora: DataTypes.DATE,
            descricao: DataTypes.STRING,
            observacao: DataTypes.STRING,
            ativo: DataTypes.BOOLEAN,
        },{
            sequelize,
            tableName: 'order_of_services'
        })
    }

    static associate(models){
        this.belongsTo(models.UserModel, { foreignKey: 'user_id', as: 'user' })
        this.belongsTo(models.ClientModel, { foreignKey: 'client_id', as: 'client' })
        this.belongsTo(models.StatusModel, { foreignKey: 'status_id', as: 'status' })
    }
}

module.exports = OrderOfServicesModel
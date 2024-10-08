const { Model, DataTypes } = require('sequelize')

class StatusModel extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            assunto: DataTypes.STRING,
            ativo: DataTypes.BOOLEAN,
        },{
            sequelize,
            tableName: 'status'
        })
    }

    static associate(models){
        this.belongsTo(models.UserModel, { foreignKey: 'user_id', as: 'user' })
        this.hasMany(models.OrderOfServiceModel, { foreignKey: 'status_id', as: 'order_of_services' })
    }
}

module.exports = StatusModel
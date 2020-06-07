const { Model, DataTypes } = require('sequelize')

class FormOfPaymentModel extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            ativo: DataTypes.BOOLEAN,
        },{
            sequelize,
            tableName: 'form_of_payments'
        })
    }

    static associate(models){
        this.belongsTo(models.UserModel, { foreignKey: 'user_id', as: 'user' })
    }
}

module.exports = FormOfPaymentModel
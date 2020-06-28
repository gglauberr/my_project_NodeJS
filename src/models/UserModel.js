const { Model, DataTypes } = require('sequelize')

class UserModel extends Model{
    static init(sequelize){
        super.init({
            login: DataTypes.STRING,
            password: DataTypes.STRING,
            ativo: DataTypes.BOOLEAN
        }, {
            sequelize,
            tableName: 'users'
        })
    }

    static associate(models){
        this.hasMany(models.DataUserModel, { foreignKey: 'user_id', as: 'data_users' })
        this.hasMany(models.ClientModel, { foreignKey: 'user_id', as: 'clients' })
        this.hasMany(models.ProviderModel, { foreignKey: 'user_id', as: 'providers' })
        this.hasMany(models.EmployeeModel, { foreignKey: 'user_id', as: 'employees' })
        this.hasMany(models.CategoryModel, { foreignKey: 'user_id', as: 'categories' })
        this.hasMany(models.StatusModel, { foreignKey: 'user_id', as: 'status' })
        this.hasMany(models.FormOfPaymentModel, { foreignKey: 'user_id', as: 'form_of_payments' })
        this.hasMany(models.OrderOfServiceModel, { foreignKey: 'user_id', as: 'order_of_services' })
    }
}

module.exports = UserModel
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
    }
}

module.exports = UserModel
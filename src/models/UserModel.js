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
}

module.exports = UserModel
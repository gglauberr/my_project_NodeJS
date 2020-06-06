const { Model, DataTypes } = require('sequelize')

class CategoryModel extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            ativo: DataTypes.BOOLEAN,
        }, {
            sequelize,
            tableName: 'categories'
        })
    }

    static associate(models){
        this.belongsTo(models.UserModel, { foreignKey: 'user_id', as: 'user' })
        this.belongsToMany(models.ProviderModel, { foreignKey: 'category_id', through: 'supplier_categories', as: 'providers' })
    }
}

module.exports = CategoryModel
const { Model, DataTypes } = require('sequelize')

class ProviderModel extends Model{
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
            site: DataTypes.STRING,
            facebook: DataTypes.STRING,
            instagram: DataTypes.STRING,
            ativo: DataTypes.BOOLEAN,
        },{
            sequelize,
            tableName: 'providers'
        })
    }

    static associate(models){
        this.belongsTo(models.UserModel, { foreignKey: 'user_id', as: 'user' })
        this.belongsToMany(models.CategoryModel, { foreignKey: 'provider_id', through: 'supplier_categories', as: 'categories' })
    }
}

module.exports = ProviderModel
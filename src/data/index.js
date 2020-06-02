const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const UserModel = require('../models/UserModel')
const DataUserModel = require('../models/DadaUserModel')
const ClientModel = require('../models/ClientModel')
const ProviderModel = require('../models/ProviderModel')
const EmployeeModel = require('../models/EmployeeModel')

const connection = new Sequelize(dbConfig)

UserModel.init(connection)
DataUserModel.init(connection)
ClientModel.init(connection)
ProviderModel.init(connection)
EmployeeModel.init(connection)

UserModel.associate(connection.models)
DataUserModel.associate(connection.models)
ClientModel.associate(connection.models)
ProviderModel.associate(connection.models)
EmployeeModel.associate(connection.models)

module.exports = connection
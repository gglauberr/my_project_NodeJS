const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const UserModel = require('../models/UserModel')
const DataUserModel = require('../models/DadaUserModel')

const connection = new Sequelize(dbConfig)

UserModel.init(connection)
DataUserModel.init(connection)

UserModel.associate(connection.models)
DataUserModel.associate(connection.models)

module.exports = connection
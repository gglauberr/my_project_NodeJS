const { Op } = require('sequelize')
const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')

module.exports = {

    async index(req, res){
        await UserModel
            .findAll({
                attributes: ['id','login','ativo','created_at','updated_at']
            })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    },

    async store(req, res){
        const { login, password, ativo } = req.body
        const salt = await bcrypt.genSalt(10)
        const passhash = await bcrypt.hash(password, salt)
        await UserModel
            .create({ 
                login, 
                password: passhash, 
                ativo 
            })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    },

    async show(req, res){
        await UserModel
            .findOne({
                attributes: ['id','login','ativo','created_at','updated_at'],
                where: {
                    id: {
                        [Op.eq]: req.params.id
                    }
                }
            })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    },

    async update(req, res){
        const { id } = req.params
        const { login, password, ativo } = req.body
        const user = await UserModel.findByPk(id)
        if(!user) return res.status(400).json({ error: 'Usuário não encontrado' })
        const salt = await bcrypt.genSalt(10)
        const passhash = await bcrypt.hash(password, salt)
        await user
            .update({ 
                login, 
                password: passhash,
                ativo 
            })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    },

    async delete(req, res){
        const { id } = req.params
        const user = await UserModel.findByPk(id)
        if(!user) return res.status(400).json({ error: 'Usuário não encontrado' })
        await user
            .destroy()
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

}
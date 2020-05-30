const UserModel = require('../models/UserModel')

module.exports = {

    async index(req, res){
        await UserModel
            .findAll()
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    },

    async store(req, res){
        const { login, password, ativo } = req.body
        await UserModel
            .create({ login, password, ativo })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    },

    async show(req, res){
        await UserModel
            .findByPk(req.params.id)
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
        await user
            .update({ login, password, ativo })
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
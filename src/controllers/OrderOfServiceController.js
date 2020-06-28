const { Op } = require('sequelize')
const UserModel = require('../models/UserModel')
const ClientModel = require('../models/ClientModel')
const StatusModel = require('../models/StatusModel')
const OrderOfServiceModel = require('../models/OrderOfServiceModel')

module.exports = {

    async index(req, res) {
        try {
            const user_id = req.user.id

            const user = await UserModel.findByPk(user_id)
            if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

            const orderOfService = await OrderOfServiceModel.findAll({
                where: {
                    user_id: {
                        [Op.eq]: user_id
                    },
                    ativo: {
                        [Op.eq]: true
                    }
                }
            })

            if (!orderOfService) return res.status(400).json({ error: 'Ordem de serviço não encontrada' })

            return res.status(200).json(orderOfService)

        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async store(req, res) {
        const user_id = req.user.id

        const { data_hora, descricao, observacao, ativo, client_id, status_id } = req.body

        const user = await UserModel.findByPk(user_id)
        if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

        const client = await ClientModel.findByPk(client_id)
        if (!client) return res.status(400).json({ error: 'cliente não encontrado' })

        const status = await StatusModel.findByPk(status_id)
        if (!status) return res.status(400).json({ error: 'status não encontrado' })


        await OrderOfServiceModel
            .create({
                data_hora, descricao, observacao, ativo, client_id, status_id, user_id
            })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    },

    async show(req, res) {
        try {
            const user_id = req.user.id
            const id = req.params.id

            const user = await UserModel.findByPk(user_id)
            if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

            const orderOfService = await OrderOfServiceModel.findOne({
                where: {
                    user_id: {
                        [Op.eq]: user_id
                    },
                    id: {
                        [Op.eq]: id
                    },
                    ativo: {
                        [Op.eq]: true
                    }
                }
            })

            if (!orderOfService) return res.status(400).json({ error: 'Ordem de serviço não encontrada' })

            return res.status(200).json(orderOfService)

        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async update(req, res) {
        const user_id = req.user.id

        const id = req.params.id

        const { data_hora, descricao, observacao, ativo, client_id, status_id } = req.body

        const user = await UserModel.findByPk(user_id)
        if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

        const client = await ClientModel.findByPk(client_id)
        if (!client) return res.status(400).json({ error: 'cliente não encontrado' })

        const status = await StatusModel.findByPk(status_id)
        if (!status) return res.status(400).json({ error: 'status não encontrado' })

        const orderOfService = await OrderOfServiceModel.findOne({
            where: {
                user_id: {
                    [Op.eq]: user_id
                },
                id: {
                    [Op.eq]: id
                },
                ativo: {
                    [Op.eq]: true
                }
            }
        })

        if (!orderOfService) return res.status(400).json({ error: 'Ordem de serviço não encontrada' })

        await orderOfService
            .update({
                data_hora, descricao, observacao, ativo, client_id, status_id, user_id
            })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    },

    async delete(req, res) {
        const user_id = req.user.id

        const id = req.params.id

        const user = await UserModel.findByPk(user_id)
        if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

        const orderOfService = await OrderOfServiceModel.findOne({
            where: {
                user_id: {
                    [Op.eq]: user_id
                },
                id: {
                    [Op.eq]: id
                },
                ativo: {
                    [Op.eq]: true
                }
            }
        })

        if (!orderOfService) return res.status(400).json({ error: 'Ordem de serviço não encontrado' })

        await orderOfService
            .update({ ativo: false })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

}